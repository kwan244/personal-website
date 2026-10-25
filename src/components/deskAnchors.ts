// Generated with DeskScene.tsx by scripts/desk-scene.py: where the HTML overlays sit on the scene.
// Every overlay box starts at `origin` (the camera's centre, in % of the scene) and its transform carries
// it onto the laptop screen or the desk in the scene's own perspective. Lengths are in cqw.
export const deskAnchors = {
  origin: {
    x: "47.756%",
    y: "53.728%",
  },
  screen: {
    w: "30.801cqw",
    h: "18.895cqw",
    transform:
      "perspective(116.527cqw) translate3d(-7.388cqw, -28.478cqw, 0) matrix3d(0.93437, 0.22756, 0.25273, 0.00000, -0.11632, 0.90821, -0.38773, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
  },
  notes: {
    "stroke-outcome-prediction": {
      w: "18.392cqw",
      h: "10.032cqw",
      transform:
        "perspective(116.527cqw) translate3d(-34.119cqw, -21.843cqw, 0) matrix3d(0.99237, -0.04643, -0.05157, 0.00000, 0.06939, 0.66402, 0.73747, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    "auss-member-platform": {
      w: "15.411cqw",
      h: "9.519cqw",
      transform:
        "perspective(116.527cqw) translate3d(-40.126cqw, -12.868cqw, 0) matrix3d(1.01260, 0.05928, 0.06584, 0.00000, -0.08859, 0.67756, 0.75251, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    plateful: {
      w: "16.473cqw",
      h: "10.982cqw",
      transform:
        "perspective(116.527cqw) translate3d(-40.679cqw, 3.755cqw, 0) matrix3d(0.98819, -0.04624, -0.05135, 0.00000, 0.06910, 0.66123, 0.73437, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    "rock-paper-scissors": {
      w: "16.369cqw",
      h: "10.306cqw",
      transform:
        "perspective(116.527cqw) translate3d(1.706cqw, 15.358cqw, 0) matrix3d(0.99059, 0.04635, 0.05148, 0.00000, -0.06927, 0.66284, 0.73615, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
    "guess-whos-the-thief": {
      w: "13.255cqw",
      h: "8.837cqw",
      transform:
        "perspective(116.527cqw) translate3d(29.584cqw, -14.256cqw, 0) matrix3d(1.02312, -0.05990, -0.06652, 0.00000, 0.08951, 0.68460, 0.76033, 0.00000, 0.00000, 0.00000, 1.00000, 0.00000, 0.00000, 0.00000, 0.00000, 1.00000)",
    },
  },
} as const;
