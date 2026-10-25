// Generated with DeskScene.tsx by scripts/desk-scene.py: where the HTML overlays sit on the scene.
// Every overlay box starts at `origin` (the camera's centre, in % of the scene) and its transform carries
// it onto the laptop screen or the desk in the scene's own perspective. Lengths are in cqw.
export const deskAnchors = {
  origin: {
    x: "45.819%",
    y: "59.834%",
  },
  screen: {
    w: "32.819cqw",
    h: "20.133cqw",
    transform:
      "perspective(116.527cqw) translate3d(-2.821cqw, -32.030cqw, 0) matrix3d(0.86108, 0.36004, 0.39986, 0.00000, -0.18403, 0.90613, -0.41958, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
  },
  notes: {
    "stroke-outcome-prediction": {
      w: "18.392cqw",
      h: "10.032cqw",
      transform:
        "perspective(116.527cqw) translate3d(-34.119cqw, -21.843cqw, 0) matrix3d(0.99237, -0.04643, -0.05157, 0.00000, 0.06939, 0.66402, 0.73747, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    "auss-member-platform": {
      w: "15.335cqw",
      h: "9.472cqw",
      transform:
        "perspective(116.527cqw) translate3d(-41.690cqw, -13.236cqw, 0) matrix3d(1.01355, 0.05933, 0.06590, 0.00000, -0.08867, 0.67820, 0.75321, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    plateful: {
      w: "16.190cqw",
      h: "10.794cqw",
      transform:
        "perspective(116.527cqw) translate3d(-41.245cqw, 1.856cqw, 0) matrix3d(0.98786, -0.04622, -0.05134, 0.00000, 0.06908, 0.66101, 0.73413, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    "rock-paper-scissors": {
      w: "15.690cqw",
      h: "9.879cqw",
      transform:
        "perspective(116.527cqw) translate3d(27.661cqw, 9.117cqw, 0) matrix3d(0.97981, 0.04585, 0.05092, 0.00000, -0.06851, 0.65562, 0.72814, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    "guess-whos-the-thief": {
      w: "11.918cqw",
      h: "7.945cqw",
      transform:
        "perspective(116.527cqw) translate3d(37.489cqw, -23.077cqw, 0) matrix3d(1.02722, -0.06014, -0.06679, 0.00000, 0.08987, 0.68735, 0.76338, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
  },
} as const;
