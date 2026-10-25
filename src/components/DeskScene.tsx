// The hero's night desk, seen from above and behind. Decorative (aria-hidden): the name, project
// notes, scroll cue and badge are real HTML on top of it. Ids are prefixed "desk-" so they can't
// clash with other SVGs. Static pose: thought bubble showing, spark hidden (also the reduced-motion pose).
// Light theme = the same desk by day: only the room colours (background, ambience, steam) change.
const typeScriptIcon =
  "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z";

export function DeskScene({ projectCount, className }: { projectCount: number; className?: string }) {
  return (
    <svg viewBox="0 0 1000 750" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="desk-ambience">
          <stop className="[stop-color:#ffffff] dark:[stop-color:#153f2e]" />
          <stop offset=".55" className="[stop-color:#eaf5ef] dark:[stop-color:#0c1e16]" />
          <stop offset="1" className="[stop-color:#d6e9df] dark:[stop-color:#070c0a]" />
        </radialGradient>
        <radialGradient id="desk-halo"><stop stopColor="#54f5b2" stopOpacity=".55" /><stop offset=".45" stopColor="#3cd69c" stopOpacity=".13" /><stop offset="1" stopColor="#3cd69c" stopOpacity="0" /></radialGradient>
        <linearGradient id="desk-screen" x2=".5" y2="1"><stop stopColor="#0e3023" /><stop offset="1" stopColor="#030c08" /></linearGradient>
        <linearGradient id="desk-edge" x2=".15" y2="1"><stop stopColor="#b1e7d2" /><stop offset=".12" stopColor="#427364" /><stop offset=".5" stopColor="#20382e" /><stop offset="1" stopColor="#41715c" /></linearGradient>
        <linearGradient id="desk-bezel" x2="0" y2="1"><stop stopColor="#101b16" /><stop offset=".3" stopColor="#020705" /><stop offset="1" stopColor="#0a130e" /></linearGradient>
        <linearGradient id="desk-deck" x2=".9" y2="1"><stop stopColor="#527c6b" /><stop offset=".12" stopColor="#2d4a3d" /><stop offset=".55" stopColor="#233c31" /><stop offset=".85" stopColor="#1c3027" /><stop offset="1" stopColor="#3b5e4e" /></linearGradient>
        <linearGradient id="desk-trackpad" x2="1" y2="1"><stop stopColor="#12271c" /><stop offset="1" stopColor="#243f32" /></linearGradient>
        <linearGradient id="desk-cloth" x2=".9" y2=".7"><stop stopColor="#345f4e" /><stop offset=".18" stopColor="#173a2a" /><stop offset=".48" stopColor="#0c2017" /><stop offset="1" stopColor="#050e09" /></linearGradient>
        <linearGradient id="desk-arm" x2="1" y2=".6"><stop stopColor="#254e3e" /><stop offset=".26" stopColor="#19382a" /><stop offset=".6" stopColor="#0c2017" /><stop offset="1" stopColor="#07100b" /></linearGradient>
        <linearGradient id="desk-skin" x2=".3" y2="1"><stop stopColor="#5f8f78" /><stop offset=".45" stopColor="#2f4d40" /><stop offset="1" stopColor="#16251e" /></linearGradient>
        <linearGradient id="desk-hand-skin" gradientUnits="userSpaceOnUse" x1="0" y1="-72" x2="0" y2="6"><stop stopColor="#6a9c84" /><stop offset=".4" stopColor="#3a5c4c" /><stop offset="1" stopColor="#1b2d24" /></linearGradient>
        <radialGradient id="desk-hair" cx=".36" cy=".12" r=".87"><stop stopColor="#254c38" /><stop offset=".35" stopColor="#10271a" /><stop offset=".7" stopColor="#070e09" /><stop offset="1" stopColor="#030705" /></radialGradient>
        <linearGradient id="desk-hair-light" x2=".5" y2="1"><stop stopColor="#a4f5cf" stopOpacity=".8" /><stop offset=".28" stopColor="#498466" stopOpacity=".4" /><stop offset="1" stopColor="#142a1c" stopOpacity="0" /></linearGradient>
        <linearGradient id="desk-ceramic" x2="1" y2=".4"><stop stopColor="#497d66" /><stop offset=".12" stopColor="#234a37" /><stop offset=".4" stopColor="#102b1e" /><stop offset="1" stopColor="#040c08" /></linearGradient>
        <radialGradient id="desk-coffee" cx=".4" cy=".32"><stop stopColor="#987149" /><stop offset=".5" stopColor="#715033" /><stop offset="1" stopColor="#352419" /></radialGradient>
        <linearGradient id="desk-steam" x2="0" y2="1">
          <stop stopOpacity="0" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
          <stop offset=".5" stopOpacity=".55" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
          <stop offset="1" stopOpacity="0" className="[stop-color:#5f8f78] dark:[stop-color:#c9ead8]" />
        </linearGradient>
        <filter id="desk-blur"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="desk-steam-blur" x="-100%" y="-30%" width="300%" height="160%"><feGaussianBlur stdDeviation="2.6" /></filter>
        <filter id="desk-shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity=".55" /></filter>
        <g id="desk-relaxed-hand">
          <g transform="translate(343 476) rotate(18) scale(1.4)">
            <path fill="url(#desk-hand-skin)" d="M-22 4C-28 -12 -32 -30 -31 -44C-31 -52 -29 -58 -24 -58C-19 -58 -18 -53 -18 -48C-18 -60 -14 -66 -9 -66C-4 -66 -2 -61 -3 -53C-2 -66 2 -71 7 -71C12 -71 14 -65 12 -55C14 -63 19 -66 24 -64C29 -62 29 -55 26 -46C25 -40 27 -35 31 -35C35 -42 39 -50 43 -49C47 -48 46 -41 43 -34C36 -20 28 -6 20 4Z" />
            <path d="M-27 -42Q0 -52 24 -44" fill="none" stroke="#a7e9c9" strokeOpacity=".16" strokeWidth="3" filter="url(#desk-steam-blur)" />
          </g>
        </g>
        <linearGradient id="desk-chair" x2="0" y2="1"><stop stopColor="#1b3328" /><stop offset=".25" stopColor="#10221a" /><stop offset="1" stopColor="#060d09" /></linearGradient>
        <linearGradient id="desk-chair-pad" x2="0" y2="1"><stop stopColor="#162c22" /><stop offset=".45" stopColor="#0b1a13" /><stop offset="1" stopColor="#040a07" /></linearGradient>
        <linearGradient id="desk-chair-rim" x2="1" y2="0"><stop stopColor="#7fe3b6" stopOpacity=".08" /><stop offset=".5" stopColor="#9df6cf" stopOpacity=".55" /><stop offset="1" stopColor="#7fe3b6" stopOpacity=".08" /></linearGradient>
      </defs>

      <rect width="1000" height="750" className="fill-[#d6e9df] dark:fill-[#070c0a]" />
      <ellipse cx="500" cy="340" rx="510" ry="420" fill="url(#desk-ambience)" />
      <ellipse cx="495" cy="285" rx="320" ry="245" fill="url(#desk-halo)" opacity=".24" />
      {/* The idea glow (replaces the old hero blob); lit in the static pose. */}
      <ellipse id="desk-idea-halo" cx="500" cy="554" rx="240" ry="170" fill="url(#desk-halo)" opacity=".72" />

      {/* Laptop geometry is generated from a 3D model (32 × 22 base, 21-high lid opened to 112°) projected
          through a camera above and behind the person, so the base and lid are the same real size and the
          lid stands up. From up here the lid's top edge is nearer the eye than its hinge, so it reads wider. */}
      <g id="desk-laptop" filter="url(#desk-shadow)">
        <path d="M300.8 46.7 L691.2 46.7 L670.7 286.1 L321.3 286.1Z" fill="url(#desk-edge)" stroke="url(#desk-edge)" strokeWidth="6" strokeLinejoin="round" />
        <path d="M305.9 50.7 L686.1 50.7 L666.7 283.9 L325.3 283.9Z" fill="url(#desk-bezel)" />
        <path d="M317.9 65.3 L674.1 65.3 L657.9 271 L334.1 271Z" fill="url(#desk-screen)" />
        <path d="M317.9 65.3 L465 65.3 L362.2 271 L334.1 271Z" fill="#b0f4d4" opacity=".025" />
        <circle cx="496" cy="57.9" r="2.3" fill="#274a3a" />
        <g fill="#416c58"><circle cx="336.6" cy="83.5" r="5" /><circle cx="352" cy="83.5" r="5" /><circle cx="367.4" cy="83.5" r="5" /></g>
        <g className="font-mono" fontSize="15.5">
          <text x="336.9" y="114.2" fill="#d8ebdf">$ npm run build-me</text>
          <path d="m339.4 132.9 3.5 4.6 8-11.5" fill="none" stroke="#80f2c4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="357.3" y="137.8" fill="#7ff1c5">compiled {projectCount} projects</text>
        </g>
        {/* The name (h1) and the Download CV prompt line sit here as real HTML, see page.tsx. */}
        <path d="M321.3 286.1 L670.7 286.1 L716 492 L276 492Z" fill="url(#desk-deck)" stroke="#5e927b" strokeWidth="1" strokeLinejoin="round" />
        <path d="M363.2 286.1 L628.8 286.1 L629.2 288.6 L362.8 288.6Z" fill="#040c08" stroke="#1c3929" />
        <path d="M325.1 292.7 L282.1 484.3 L709.9 484.3 L666.9 292.7" fill="none" stroke="#8cd2b0" strokeOpacity=".18" strokeWidth="2" />
        <path d="M340 297.7 L652 297.7 L670.2 391.7 L321.8 391.7Z" fill="#07110b" stroke="#567963" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M346.3 300.2 L365 300.2 L362.7 314.4 L343.6 314.4Z M367.9 300.2 L386.6 300.2 L384.7 314.4 L365.6 314.4Z M389.5 300.2 L408.2 300.2 L406.7 314.4 L387.6 314.4Z M411 300.2 L429.8 300.2 L428.6 314.4 L409.6 314.4Z M432.6 300.2 L451.4 300.2 L450.6 314.4 L431.5 314.4Z M454.2 300.2 L473 300.2 L472.6 314.4 L453.5 314.4Z M475.8 300.2 L494.6 300.2 L494.6 314.4 L475.5 314.4Z M497.4 300.2 L516.2 300.2 L516.5 314.4 L497.4 314.4Z M519 300.2 L537.8 300.2 L538.5 314.4 L519.4 314.4Z M540.6 300.2 L559.4 300.2 L560.5 314.4 L541.4 314.4Z M562.2 300.2 L581 300.2 L582.4 314.4 L563.4 314.4Z M583.8 300.2 L602.5 300.2 L604.4 314.4 L585.3 314.4Z M605.4 300.2 L624.1 300.2 L626.4 314.4 L607.3 314.4Z M627 300.2 L645.7 300.2 L648.4 314.4 L629.3 314.4Z M343.1 317.2 L362.3 317.2 L359.9 331.9 L340.4 331.9Z M365.2 317.2 L384.3 317.2 L382.3 331.9 L362.8 331.9Z M387.2 317.2 L406.4 317.2 L404.8 331.9 L385.3 331.9Z M409.3 317.2 L428.4 317.2 L427.2 331.9 L407.7 331.9Z M431.3 317.2 L450.5 317.2 L449.6 331.9 L430.2 331.9Z M453.4 317.2 L472.5 317.2 L472.1 331.9 L452.6 331.9Z M475.4 317.2 L494.5 317.2 L494.5 331.9 L475 331.9Z M497.5 317.2 L516.6 317.2 L517 331.9 L497.5 331.9Z M519.5 317.2 L538.6 317.2 L539.4 331.9 L519.9 331.9Z M541.5 317.2 L560.7 317.2 L561.8 331.9 L542.4 331.9Z M563.6 317.2 L582.7 317.2 L584.3 331.9 L564.8 331.9Z M585.6 317.2 L604.8 317.2 L606.7 331.9 L587.2 331.9Z M607.7 317.2 L626.8 317.2 L629.2 331.9 L609.7 331.9Z M629.7 317.2 L648.9 317.2 L651.6 331.9 L632.1 331.9Z M339.9 334.9 L359.4 334.9 L356.9 350.2 L337 350.2Z M362.4 334.9 L381.9 334.9 L379.8 350.2 L359.9 350.2Z M384.9 334.9 L404.4 334.9 L402.8 350.2 L382.9 350.2Z M407.4 334.9 L427 334.9 L425.7 350.2 L405.8 350.2Z M429.9 334.9 L449.5 334.9 L448.6 350.2 L428.7 350.2Z M452.4 334.9 L472 334.9 L471.6 350.2 L451.7 350.2Z M475 334.9 L494.5 334.9 L494.5 350.2 L474.6 350.2Z M497.5 334.9 L517 334.9 L517.4 350.2 L497.5 350.2Z M520 334.9 L539.6 334.9 L540.3 350.2 L520.4 350.2Z M542.5 334.9 L562.1 334.9 L563.3 350.2 L543.4 350.2Z M565 334.9 L584.6 334.9 L586.2 350.2 L566.3 350.2Z M587.6 334.9 L607.1 334.9 L609.1 350.2 L589.2 350.2Z M610.1 334.9 L629.6 334.9 L632.1 350.2 L612.2 350.2Z M632.6 334.9 L652.1 334.9 L655 350.2 L635.1 350.2Z M336.4 353.3 L356.4 353.3 L353.8 369.4 L333.5 369.4Z M359.4 353.3 L379.4 353.3 L377.3 369.4 L356.9 369.4Z M382.5 353.3 L402.4 353.3 L400.7 369.4 L380.3 369.4Z M405.5 353.3 L425.5 353.3 L424.1 369.4 L403.8 369.4Z M428.5 353.3 L448.5 353.3 L447.6 369.4 L427.2 369.4Z M451.5 353.3 L471.5 353.3 L471 369.4 L450.7 369.4Z M474.5 353.3 L494.5 353.3 L494.5 369.4 L474.1 369.4Z M497.5 353.3 L517.5 353.3 L517.9 369.4 L497.5 369.4Z M520.5 353.3 L540.5 353.3 L541.3 369.4 L521 369.4Z M543.5 353.3 L563.5 353.3 L564.8 369.4 L544.4 369.4Z M566.5 353.3 L586.5 353.3 L588.2 369.4 L567.9 369.4Z M589.6 353.3 L609.5 353.3 L611.7 369.4 L591.3 369.4Z M612.6 353.3 L632.6 353.3 L635.1 369.4 L614.7 369.4Z M635.6 353.3 L655.6 353.3 L658.5 369.4 L638.2 369.4Z M331.3 372.6 L364.3 372.6 L361.7 389.4 L328.2 389.4Z M368.1 372.6 L401.1 372.6 L399.3 389.4 L365.7 389.4Z M404.9 372.6 L587.1 372.6 L588.8 389.4 L403.2 389.4Z M590.9 372.6 L623.9 372.6 L626.3 389.4 L592.7 389.4Z M627.7 372.6 L660.7 372.6 L663.8 389.4 L630.3 389.4Z" fill="#0f1d16" stroke="#395d4c" strokeWidth=".65" strokeLinejoin="round" />
        <path d="M431.8 404.5 L560.2 404.5 L565.3 476.7 L426.7 476.7Z" fill="url(#desk-trackpad)" stroke="#5a7c65" strokeOpacity=".6" strokeLinejoin="round" />
        <path d="M289.2 492 L702.8 492" stroke="#030906" strokeWidth="4" strokeLinecap="round" />
        <path d="M452 492 L540 492" stroke="#87e1b7" strokeOpacity=".6" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      <g id="desk-mug" filter="url(#desk-shadow)">
        <ellipse cx="833" cy="424" rx="59" ry="21" fill="#000" opacity=".3" />
        <path d="M868 376C898 366 914 384 909 400C904 414 886 418 866 410" fill="none" stroke="#163d2a" strokeWidth="11" strokeLinecap="round" />
        <path d="M872 372C898 364 911 380 906 395" fill="none" stroke="#5c9e7a" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
        <path d="M783 359C782 391 786 430 816 437C851 446 872 425 877 361Z" fill="url(#desk-ceramic)" />
        <path d="M784 361Q782 406 802 425" fill="none" stroke="#99eac3" strokeOpacity=".18" strokeWidth="1.5" />
        <ellipse cx="830" cy="357" rx="48" ry="41" fill="#143020" stroke="#a7efd0" strokeWidth="1.7" />
        <ellipse cx="830" cy="361" rx="43" ry="35" fill="#352c1e" stroke="#64917a" strokeWidth="1" />
        <ellipse cx="830" cy="364" rx="40" ry="32" fill="url(#desk-coffee)" stroke="#a88659" strokeWidth="1.2" />
        <path d="M794 362C801 333 838 327 859 347" fill="none" stroke="#d5b48b" strokeOpacity=".35" strokeWidth="1.5" />
        <ellipse cx="810" cy="347" rx="8" ry="3.5" transform="rotate(-28 810 347)" fill="#e4cfa8" opacity=".16" />
        <path d="M808 370c4-14 24-18 36-8c8 7 4 18-6 18" fill="none" stroke="#e2c49b" strokeOpacity=".28" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g id="desk-steam-rising" fill="none" stroke="url(#desk-steam)" strokeLinecap="round" filter="url(#desk-steam-blur)" opacity=".35">
        <path className="desk-wisp" d="M822 332C808 312 840 298 831 278S813 249 822 219" strokeWidth="7" />
        <path className="desk-wisp" d="M834 329C847 310 829 296 839 276S841 247 834 231" strokeWidth="3" />
        <path className="desk-wisp" d="M814 332C804 315 825 298 819 281S809 251 814 236" strokeWidth="4.5" />
      </g>

      <g id="desk-person">
        <path d="M196 750C196 705 214 668 252 650C290 632 340 632 380 650L425 662H575L620 650C660 632 710 632 748 650C786 668 804 705 804 750Z" fill="url(#desk-cloth)" />
        <path d="M214 690C222 664 238 652 262 645C300 634 342 636 380 650M786 690C778 664 762 652 738 645C700 634 658 636 620 650" fill="none" stroke="#7fe3b6" strokeOpacity=".2" strokeWidth="6" filter="url(#desk-blur)" />
        <path d="M190 770C176 732 174 690 191 660C204 636 220 605 237 579L299 495L319 465Q335 455 361 479L369 496L337 540L302 623L268 705L252 770Z" fill="url(#desk-arm)" />
        <path d="M810 770C824 732 826 690 809 660C796 636 780 605 763 579L701 495L681 465Q665 455 639 479L631 496L663 540L698 623L732 705L748 770Z" fill="url(#desk-arm)" />
        <g className="desk-hand"><use href="#desk-relaxed-hand" /></g>
        <g className="desk-hand desk-hand-right"><use href="#desk-relaxed-hand" transform="translate(1000 0) scale(-1 1)" /></g>
        <path d="M427 654Q450 646 456 637H544Q550 646 573 654L565 703H435Z" fill="#0a1a10" />
        <path d="M457 643H543L545 691Q502 715 454 691Z" fill="url(#desk-skin)" />
        <ellipse cx="412" cy="640" rx="10" ry="20" fill="url(#desk-skin)" transform="rotate(-9 412 640)" />
        <ellipse cx="588" cy="640" rx="10" ry="20" fill="url(#desk-skin)" transform="rotate(9 588 640)" />
        <path d="M411 615C397 586 409 549 433 532C444 512 480 500 505 511C539 507 566 528 578 554C601 573 599 615 585 641C576 669 547 701 501 703C455 702 424 666 415 641Z" fill="url(#desk-hair)" />
        <path d="M411 611C403 581 414 554 437 536C453 513 480 505 504 512C538 509 562 527 578 554" fill="none" stroke="#79dfad" strokeOpacity=".17" strokeWidth="5" filter="url(#desk-blur)" />
        <g fill="none" stroke="url(#desk-hair-light)" strokeLinecap="round" strokeWidth="2" opacity=".55">
          <path d="M440 545Q452 528 472 522" /><path d="M466 528Q484 512 506 513" /><path d="M500 516Q526 512 548 528" /><path d="M536 528Q556 536 568 552" />
        </g>
        <path d="M405 684Q425 675 449 695Q500 712 551 695Q575 675 595 684L610 711H389Z" fill="#07150c" />
      </g>

      <g id="desk-chair-back">
        <path d="M200 760L206 690C210 660 238 645 280 641Q500 622 720 641C762 645 790 660 794 690L800 760Z" fill="url(#desk-chair)" />
        <path d="M206 690C210 660 238 645 280 641Q500 622 720 641C762 645 790 660 794 690" fill="none" stroke="#7fe3b6" strokeOpacity=".14" strokeWidth="8" filter="url(#desk-blur)" />
        <path d="M206 690C210 660 238 645 280 641Q500 622 720 641C762 645 790 660 794 690" fill="none" stroke="url(#desk-chair-rim)" strokeWidth="1.8" />
        <path d="M232 760L236 698C239 676 258 664 292 661Q500 645 708 661C742 664 761 676 764 698L768 760Z" fill="url(#desk-chair-pad)" />
        <ellipse cx="500" cy="668" rx="210" ry="16" fill="#7fe3b6" opacity=".05" filter="url(#desk-blur)" />
      </g>

      <path id="desk-spark" d="m591 511 5.5 12 12 5.5-12 5.5-5.5 12-5.5-12-12-5.5 12-5.5Z" fill="#91f6c9" opacity="0" />
      {/* Hidden on narrow screens: the crop would cut the bubble in half. */}
      <g id="desk-thought" className="scene-narrow:hidden">
        <g fill="#08140d" stroke="#a1f3ce" strokeWidth="1.5">
          <circle cx="615" cy="550" r="5" />
          <circle cx="639" cy="536" r="8" />
          <rect x="663" y="500" width="190" height="47" rx="23.5" />
        </g>
        {/* HTML inside the pill so the icon (18px) + name centre together without measuring text. */}
        <foreignObject x="663" y="500" width="190" height="47">
          <div className="flex h-full items-center justify-center gap-[10px] font-sans text-[15px] text-[#e5f6eb]">
            <svg viewBox="0 0 24 24" className="size-[18px] shrink-0 fill-[#a1f3ce]">
              <path d={typeScriptIcon} />
            </svg>
            TypeScript
          </div>
        </foreignObject>
      </g>
    </svg>
  );
}
