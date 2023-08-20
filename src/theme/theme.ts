import button from "./button";
import palette from "./palette";

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
      brand: palette.brand.primary,
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
  button,
};
