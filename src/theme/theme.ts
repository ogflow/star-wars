const palette = {
  brand: "#FFE81F",
  background: {
    primary: "#000000",
    front: "#1d1f24",
    contrast: "#2a2d36",
  },
  text: {
    primary: "#FFFFFF",
    weak: "#b1b4bd",
    xweak: "#83868f",
  },
  border: "#3f424a",
  focus: "#0044ff",
};

export const theme = {
  rounding: 8,
  spacing: 28,
  global: {
    font: {
      family: "Helvetica",
      size: "21px",
      height: "28px",
      maxWidth: "588px",
    },
    colors: {
      brand: palette.brand,
      background: palette.background.primary,
      "background-back": palette.background.primary,
      "background-front": palette.background.front,
      "background-contrast": palette.background.contrast,
      text: palette.text.primary,
      "text-strong": palette.text.primary,
      "text-weak": palette.text.weak,
      "text-xweak": palette.text.xweak,
      border: palette.border,
      focus: palette.focus,
      control: "brand",
    },
  },
};
