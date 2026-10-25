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
      w: "24.561cqw",
      h: "11.434cqw",
      transform:
        "perspective(116.527cqw) translate3d(-41.152cqw, -26.512cqw, 0) matrix3d(0.99206, -0.04642, -0.05155, 0.00000, 0.06432, 0.89234, 0.43429, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    "auss-member-platform": {
      w: "18.950cqw",
      h: "11.844cqw",
      transform:
        "perspective(116.527cqw) translate3d(-41.892cqw, -14.863cqw, 0) matrix3d(1.01164, 0.05922, 0.06577, 0.00000, -0.08206, 0.91033, 0.44251, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    plateful: {
      w: "18.309cqw",
      h: "12.761cqw",
      transform:
        "perspective(116.527cqw) translate3d(-43.223cqw, -1.507cqw, 0) matrix3d(0.98799, -0.04623, -0.05134, 0.00000, 0.06406, 0.88867, 0.43250, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    "rock-paper-scissors": {
      w: "17.431cqw",
      h: "12.021cqw",
      transform:
        "perspective(116.527cqw) translate3d(22.409cqw, 7.256cqw, 0) matrix3d(0.98135, 0.04592, 0.05100, 0.00000, -0.06363, 0.88270, 0.42959, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    "guess-whos-the-thief": {
      w: "14.460cqw",
      h: "9.640cqw",
      transform:
        "perspective(116.527cqw) translate3d(34.604cqw, -27.186cqw, 0) matrix3d(1.02713, -0.06013, -0.06678, 0.00000, 0.08332, 0.92427, 0.44928, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
  },
} as const;
