# Generates the hero desk scene (the laptop at a 3/4 view, project notes on the desk) as
# src/components/DeskScene.tsx, plus src/components/deskAnchors.ts: CSS 3D transforms that lay the HTML
# overlays (screen text, notes) onto the same model through the same camera, so the text and the drawing
# share one true perspective. Run: python scripts/desk-scene.py  (env AZ, EL, DIST, DECKW, TOP tweak the camera)
import math, json, sys, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src", "components")
E = lambda k, d: float(os.environ.get(k, d))
VBW, VBH = 1200, 750
AZ, EL, DIST = math.radians(E("AZ", 20)), math.radians(E("EL", 42)), E("DIST", 105)
DECK_W, LID_TOP = E("DECKW", 430), E("TOP", 40)
YAW, LSCALE = math.radians(E("YAW", -12)), E("LSCALE", 1.1)  # the laptop's turn on the desk, and its size

def sub(a, b): return tuple(x - y for x, y in zip(a, b))
def add(a, b): return tuple(x + y for x, y in zip(a, b))
def mul(a, k): return tuple(x * k for x in a)
def dot(a, b): return sum(x * y for x, y in zip(a, b))
def norm(v): l = math.sqrt(dot(v, v)); return tuple(x / l for x in v)
def cross(a, b): return (a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0])
def circle3(c, r, n, z=None): return [(c[0] + r*math.cos(2*math.pi*i/n), c[1] + r*math.sin(2*math.pi*i/n), c[2] if z is None else z) for i in range(n)]

# Model (desk units): the deck's centre is the origin, z is up, the lid hinges on the back edge (+y).
W, D, T, H = 32.0, 22.0, 1.3, 21.0
lean = math.radians(20)
Lv, Ln = (0, math.sin(lean), math.cos(lean)), (0, math.cos(lean), -math.sin(lean))
def place(p):  # scale the laptop, then turn it about its centre (negative = facing further left)
    x, y, z = mul(p, LSCALE); c, s = math.cos(YAW), math.sin(YAW); return (x*c - y*s, x*s + y*c, z)
def deck(u, v, z=T): return place((-W/2 + u*W, -D/2 + v*D, z))
def lid(u, t, back=0.0): return place(add(add((-W/2 + u*W, D/2, T), mul(Lv, t*H)), mul(Ln, back)))
mug_c, mug_r, mug_h = (36.0, 12.0, 0.0), 3.0, 7.0
# slug: centre (x, y) on the desk, size (w, h), rotation (deg) on top of facing the camera
NOTES = {
    "stroke-outcome-prediction": ((-41, 24), (22, 12), 4),
    "auss-member-platform": ((-42, 4), (17, 10.5), -5),
    "plateful": ((-28, -15), (15, 10), 4),
    "rock-paper-scissors": ((33, -3), (13.5, 8.5), -4),
    "guess-whos-the-thief": ((36, 56), (15, 10), 5),
}

# Camera: perspective from the front-right, scaled so the deck is DECK_W units wide.
tgt = (0.0, -2.0, 4.0)
cam = add(tgt, mul((math.sin(AZ)*math.cos(EL), -math.cos(AZ)*math.cos(EL), math.sin(EL)), DIST))
fwd = norm(sub(tgt, cam)); right = norm(cross(fwd, (0, 0, 1))); up = cross(right, fwd)
def raw(p): v = sub(p, cam); z = dot(v, fwd); return (dot(v, right)/z, -dot(v, up)/z)
S = DECK_W / math.dist(raw((-W/2, -D/2, T)), raw((W/2, -D/2, T)))  # scene scale from the unturned, unscaled deck
# Centre the laptop's outline (not just its screen), so phones can crop to it evenly.
_xs = [raw(p)[0] for p in [deck(u, v, z) for u in (0, 1) for v in (0, 1) for z in (0, T)] + [lid(u, t) for u in (0, 1) for t in (0, 1)]]
OX = VBW/2 - (min(_xs) + max(_xs))/2*S
OY = LID_TOP - min(raw(lid(u, 1))[1] for u in (0, 1))*S
def P(p): r = raw(p); return (OX + r[0]*S, OY + r[1]*S)

f = lambda x: ("%.1f" % x).rstrip("0").rstrip(".")
def poly(pts): return "M" + " L".join(f(x) + " " + f(y) for x, y in pts) + "Z"
def line(pts): return "M" + " L".join(f(x) + " " + f(y) for x, y in pts)
quad = lambda fn, u0, u1, v0, v1: poly([fn(u0, v1), fn(u1, v1), fn(u1, v0), fn(u0, v0)])
D2 = lambda u, v: P(deck(u, v)); L2 = lambda u, t: P(lid(u, t))
cq = lambda units: "%.3fcqw" % (units * 100 / VBW)

def hull(points):
    pts = sorted(set(points))
    def half(seq):
        out = []
        for p in seq:
            while len(out) >= 2 and (out[-1][0]-out[-2][0])*(p[1]-out[-2][1]) - (out[-1][1]-out[-2][1])*(p[0]-out[-2][0]) <= 0: out.pop()
            out.append(p)
        return out
    lo, hi = half(pts), half(list(reversed(pts)))
    return lo[:-1] + hi[:-1]

def overlay(tl, tr, bl):
    """CSS transform that carries an HTML box (top-left at the camera's centre, OX/OY) onto the 3D rectangle
    tl/tr/bl. perspective(S) reproduces the camera exactly; every length is in cqw, so it scales with the scene."""
    w = math.dist(P(tl), P(tr)); h = w * math.dist(tl, bl) / math.dist(tl, tr)
    e1, e2 = mul(sub(tr, tl), 1/w), mul(sub(bl, tl), 1/h)
    v = sub(tl, cam); K = S / dot(v, fwd)
    col = lambda e: (K*dot(e, right), -K*dot(e, up), -K*dot(e, fwd))
    m = ", ".join("%.5f" % x for x in (*col(e1), 0, *col(e2), 0, 0, 0, 1, 0, 0, 0, 0, 1))
    tx, ty = K*dot(v, right), -K*dot(v, up)
    return {"w": cq(w), "h": cq(h), "transform": f"perspective({cq(S)}) translate3d({cq(tx)}, {cq(ty)}, 0) matrix3d({m})"}

def note_corners(c, s, rot):  # TL, TR, BR, BL; TL is the far-left corner
    # Turned to face the camera (text runs level on screen), plus each note's own small rotation.
    (cx, cy), (w, h) = c, s; a = math.atan2(right[1], right[0]) + math.radians(rot)
    return [(cx + dx*math.cos(a) - dy*math.sin(a), cy + dx*math.sin(a) + dy*math.cos(a), 0.02)
            for dx, dy in [(-w/2, h/2), (w/2, h/2), (w/2, -h/2), (-w/2, -h/2)]]

g = []
# Light: the screen is the key light. A pool on the desk in front of it and a bloom around the lid.
g.append(f'<path d="{poly([P((x, y, 0)) for x, y, _ in circle3(place((0, -9, 0)), 34, 64)])}" fill="url(#desk-pool)" className="opacity-50 dark:opacity-100" />')
g.append(f'<path d="{quad(L2,-.04,1.04,-.02,1.05)}" fill="#6ee7b7" filter="url(#desk-bloom)" className="opacity-10 dark:opacity-25" />')
# Shadows: a soft one cast away from the room light, and tight contact shadows where things meet the desk.
foot = [P(deck(u, v, 0)) for u, v in [(0, 0), (1, 0), (1, 1), (0, 1)]]
g.append(f'<path d="{poly([(x+10, y+14) for x, y in foot])}" fill="#000" filter="url(#desk-soft)" className="opacity-20 dark:opacity-50" />')
g.append(f'<path d="{poly(foot)}" fill="#000" filter="url(#desk-contact)" className="opacity-30 dark:opacity-70" />')
mfoot = [P((x, y, 0)) for x, y, _ in circle3(mug_c, mug_r + .4, 48)]
g.append(f'<path d="{poly([(x+8, y+10) for x, y in mfoot])}" fill="#000" filter="url(#desk-soft)" className="opacity-20 dark:opacity-50" />')
g.append(f'<path d="{poly(mfoot)}" fill="#000" filter="url(#desk-contact)" className="opacity-30 dark:opacity-60" />')

lap = []
lap.append(f'<path d="{poly([P(deck(1,0,0)),P(deck(1,1,0)),P(deck(1,1)),P(deck(1,0))])}" fill="#0d1b15" />')
lap.append(f'<path d="{poly([P(deck(0,0,0)),P(deck(1,0,0)),P(deck(1,0)),P(deck(0,0))])}" fill="#142820" />')
lap.append(f'<path d="{quad(D2,0,1,0,1)}" fill="url(#desk-deck)" />')
lap.append(f'<path d="{quad(D2,0,1,0,1)}" fill="url(#desk-spill)" stroke="#6fae92" strokeOpacity=".55" strokeWidth="1.2" strokeLinejoin="round" />')
lap.append(f'<path d="{line([D2(.02,0),D2(.98,0)])}" stroke="#9fe6c5" strokeOpacity=".35" strokeWidth="1.4" strokeLinecap="round" />')
lap.append(f'<path d="{quad(D2,.06,.94,.45,.95)}" fill="#06100b" stroke="#4c705d" strokeWidth="1.1" strokeLinejoin="round" />')
LIT = {(0, 3), (1, 6), (2, 9), (1, 2), (3, 5), (2, 12), (0, 10)}
keys, lit = [], []
for r in range(5):
    v1 = .935 - r*.096; v0 = v1 - .08
    if r == 4:
        for u0, u1 in [(.075, .16), (.17, .255), (.265, .735), (.745, .83), (.84, .925)]: keys.append(quad(D2, u0, u1, v0, v1))
        continue
    for c in range(14):
        kw = .85/14; u0 = .075 + c*kw + .004
        (lit if (r, c) in LIT else keys).append(quad(D2, u0, u0 + kw - .008, v0, v1))
lap.append(f'<path d="{" ".join(keys)}" fill="url(#desk-keys)" stroke="#34584a" strokeWidth=".7" strokeLinejoin="round" />')
lap.append(f'<path d="{" ".join(lit)}" fill="#6ee7b7" filter="url(#desk-glow)" className="desk-keys-glow" />')
lap.append(f'<path d="{" ".join(lit)}" fill="#b9f8dc" />')
lap.append(f'<path d="{quad(D2,.34,.66,.06,.38)}" fill="url(#desk-trackpad)" stroke="#5a8a72" strokeOpacity=".55" strokeLinejoin="round" />')
lap.append(f'<path d="{poly([P(lid(0,1)),P(lid(1,1)),P(lid(1,1,.6)),P(lid(0,1,.6))])}" fill="#2d4a3d" />')
lap.append(f'<path d="{poly([P(lid(1,0)),P(lid(1,1)),P(lid(1,1,.6)),P(lid(1,0,.6))])}" fill="#16291f" />')
lap.append(f'<path d="{quad(L2,0,1,0,1)}" fill="url(#desk-edge)" stroke="url(#desk-edge)" strokeWidth="4" strokeLinejoin="round" />')
lap.append(f'<path d="{quad(L2,.012,.988,.012,.985)}" fill="url(#desk-bezel)" />')
lap.append(f'<path d="{quad(L2,.04,.96,.07,.93)}" fill="url(#desk-screen)" />')
lap.append(f'<path d="{poly([L2(.04,.93),L2(.38,.93),L2(.14,.07),L2(.04,.07)])}" fill="#c8fbe3" opacity=".035" />')
cx, cy = L2(.5, .96); lap.append(f'<circle cx="{f(cx)}" cy="{f(cy)}" r="2.2" fill="#274a3a" />')
lap.append('<g fill="#416c58">' + "".join(f'<circle cx="{f(L2(u,.875)[0])}" cy="{f(L2(u,.875)[1])}" r="4.5" />' for u in (.075, .11, .145)) + '</g>')

mtop = [P(p) for p in circle3(mug_c, mug_r, 64, z=mug_h)]
mbot = [P(p) for p in circle3(mug_c, mug_r, 64, z=0)]
mug = []
hc = (mug_c[0] + right[0]*(mug_r - .2), mug_c[1] + right[1]*(mug_r - .2))
# The handle lies in the plane facing the camera, so it reads as a clear loop.
handle = [P((hc[0] + right[0]*2.7*math.cos(a), hc[1] + right[1]*2.7*math.cos(a), 4.0 + 2.6*math.sin(a))) for a in map(math.radians, range(-85, 86, 10))]
mug.append(f'<path d="{line(handle)}" fill="none" stroke="#163d2a" strokeWidth="11" strokeLinecap="round" />')
mug.append(f'<path d="{poly(hull(mtop + mbot))}" fill="url(#desk-ceramic)" />')
# Screen light catching the mug's laptop-facing side.
mug.append(f'<path d="{line([P((mug_c[0] - mug_r*.97, mug_c[1] - mug_r*.25, z)) for z in (mug_h*.9, .6)])}" stroke="#8ff0c4" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" filter="url(#desk-glow)" />')
mug.append(f'<path d="{poly(mtop)}" fill="#143020" stroke="#a7efd0" strokeWidth="1.6" />')
mug.append(f'<path d="{poly([P(p) for p in circle3(mug_c, mug_r*.86, 64, z=mug_h-.7)])}" fill="url(#desk-coffee)" stroke="#a88659" strokeWidth="1" />')
mx, my = P((mug_c[0], mug_c[1], mug_h))
steam = (f'<path className="desk-wisp" d="M{f(mx-6)} {f(my-14)}c-14-20 16-34 7-54s-12-29-1-58" strokeWidth="7" />'
         f'<path className="desk-wisp" d="M{f(mx+8)} {f(my-16)}c12-19-6-31 3-50s4-27-2-42" strokeWidth="3" />'
         f'<path className="desk-wisp" d="M{f(mx-14)} {f(my-12)}c-9-16 11-30 5-46s-9-26-4-40" strokeWidth="4.5" />')

# Paper lies flat, so its shadow is a thin contact line rather than a float.
shadows, notes_out = [], {}
for slug, (c, s, rot) in NOTES.items():
    corners = note_corners(c, s, rot)
    shadows.append(poly([(x+2, y+3) for x, y in (P(p) for p in corners)]))
    notes_out[slug] = overlay(corners[0], corners[1], corners[3])
scr = overlay(lid(.04, .93), lid(.96, .93), lid(.04, .07))
origin = {"x": "%.3f%%" % (OX / VBW * 100), "y": "%.3f%%" % (OY / VBH * 100)}
hx0, hy0 = D2(.5, 1); hx1, hy1 = D2(.5, 0)
nl = "\n"

jsx = f'''// The hero's desk: the laptop at a 3/4 view with a coffee and project sticky notes. Decorative
// (aria-hidden): the name, Download CV link and notes are real HTML on top of it (see page.tsx). Ids are
// prefixed "desk-" so they can't clash with other SVGs. Dark = night, lit by the screen; light = the same
// desk by day, with the screen glow and shadows softened. The laptop screen stays dark in both.
// Generated by scripts/desk-scene.py from a 3D model (32 × 22 base, 21-high lid opened to 110°) seen from
// {round(math.degrees(AZ))}° right of front and {round(math.degrees(EL))}° up; deskAnchors.ts comes from the same model and camera.
export function DeskScene({{ className }}: {{ className?: string }}) {{
  return (
    <svg viewBox="0 0 {VBW} {VBH}" aria-hidden="true" className={{className}}>
      <defs>
        <radialGradient id="desk-ambience" cx=".5" cy=".42" r=".5">
          <stop className="[stop-color:#ffffff] dark:[stop-color:#123827]" />
          <stop offset=".5" className="[stop-color:#e8f4ee] dark:[stop-color:#0b1c15]" />
          <stop offset="1" className="[stop-color:#d6e9df] dark:[stop-color:#070c0a]" />
        </radialGradient>
        <radialGradient id="desk-pool"><stop stopColor="#6ee7b7" stopOpacity=".3" /><stop offset=".35" stopColor="#6ee7b7" stopOpacity=".13" /><stop offset="1" stopColor="#6ee7b7" stopOpacity="0" /></radialGradient>
        <linearGradient id="desk-spill" gradientUnits="userSpaceOnUse" x1="{f(hx0)}" y1="{f(hy0)}" x2="{f(hx1)}" y2="{f(hy1)}"><stop stopColor="#8ff0c4" stopOpacity=".22" /><stop offset=".45" stopColor="#8ff0c4" stopOpacity=".05" /><stop offset="1" stopColor="#8ff0c4" stopOpacity="0" /></linearGradient>
        <linearGradient id="desk-screen" x2=".4" y2="1"><stop stopColor="#103626" /><stop offset=".6" stopColor="#06170f" /><stop offset="1" stopColor="#030c08" /></linearGradient>
        <linearGradient id="desk-edge" x2=".25" y2="1"><stop stopColor="#b8ecd7" /><stop offset=".12" stopColor="#4a7d6c" /><stop offset=".55" stopColor="#20382e" /><stop offset="1" stopColor="#3c6a56" /></linearGradient>
        <linearGradient id="desk-bezel" x2="0" y2="1"><stop stopColor="#101b16" /><stop offset=".3" stopColor="#020705" /><stop offset="1" stopColor="#0a130e" /></linearGradient>
        <linearGradient id="desk-deck" x2=".8" y2="1"><stop stopColor="#46705f" /><stop offset=".25" stopColor="#2b4a3c" /><stop offset=".7" stopColor="#1f362b" /><stop offset="1" stopColor="#172a21" /></linearGradient>
        <linearGradient id="desk-keys" x2="0" y2="1"><stop stopColor="#14271e" /><stop offset="1" stopColor="#0d1a14" /></linearGradient>
        <linearGradient id="desk-trackpad" x2="1" y2="1"><stop stopColor="#1a3528" /><stop offset="1" stopColor="#21392d" /></linearGradient>
        <linearGradient id="desk-ceramic" x2="1" y2=".25"><stop stopColor="#4f8a70" /><stop offset=".14" stopColor="#24503b" /><stop offset=".5" stopColor="#102b1e" /><stop offset="1" stopColor="#050e09" /></linearGradient>
        <radialGradient id="desk-coffee" cx=".4" cy=".35"><stop stopColor="#987149" /><stop offset=".55" stopColor="#715033" /><stop offset="1" stopColor="#352419" /></radialGradient>
        <linearGradient id="desk-steam" x2="0" y2="1">
          <stop stopOpacity="0" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
          <stop offset=".5" stopOpacity=".55" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
          <stop offset="1" stopOpacity="0" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
        </linearGradient>
        <filter id="desk-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14" /></filter>
        <filter id="desk-contact" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="desk-bloom" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="26" /></filter>
        <filter id="desk-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
        <filter id="desk-steam-blur" x="-100%" y="-30%" width="300%" height="160%"><feGaussianBlur stdDeviation="2.6" /></filter>
      </defs>

      <rect width="{VBW}" height="{VBH}" className="fill-[#d6e9df] dark:fill-[#070c0a]" />
      <rect width="{VBW}" height="{VBH}" fill="url(#desk-ambience)" />{"".join(nl + "      " + x for x in g)}
      {{/* Note contact shadows; the notes themselves are HTML, shown only when the whole desk fits. */}}
      <path d="{" ".join(shadows)}" fill="#000" filter="url(#desk-contact)" className="opacity-15 scene-narrow:hidden dark:opacity-40" />

      <g id="desk-laptop">{"".join(nl + "        " + x for x in lap)}
        {{/* The name (h1), headline and Download CV prompt sit on the screen as real HTML, see page.tsx. */}}
      </g>

      <g id="desk-mug">{"".join(nl + "        " + x for x in mug)}
      </g>
      <g id="desk-steam-rising" fill="none" stroke="url(#desk-steam)" strokeLinecap="round" filter="url(#desk-steam-blur)" opacity=".35">
        {steam}
      </g>
    </svg>
  );
}}
'''
anchors = json.dumps({"origin": origin, "screen": scr, "notes": notes_out}, indent=2)
open(os.path.join(ROOT, "DeskScene.tsx"), "w", encoding="utf-8", newline="\n").write(jsx)
open(os.path.join(ROOT, "deskAnchors.ts"), "w", encoding="utf-8", newline="\n").write(
    "// Generated with DeskScene.tsx by scripts/desk-scene.py: where the HTML overlays sit on the scene.\n"
    "// Every overlay box starts at `origin` (the camera's centre, in % of the scene) and its transform carries\n"
    "// it onto the laptop screen or the desk in the scene's own perspective. Lengths are in cqw.\n"
    "export const deskAnchors = " + anchors + " as const;\n")

def bounds(pts): xs = [p[0] for p in pts]; ys = [p[1] for p in pts]; return [round(min(xs)), round(min(ys)), round(max(xs)), round(max(ys))]
print("laptop", bounds([D2(u, v) for u in (0, 1) for v in (0, 1)] + [L2(u, t) for u in (0, 1) for t in (0, 1)]))
print("mug", bounds(mtop + mbot + handle))
for slug, (c, s, rot) in NOTES.items(): print(slug, bounds([P(p) for p in note_corners(c, s, rot)]))
