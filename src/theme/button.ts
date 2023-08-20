import { ThemeType } from "grommet";
import { getTransition } from "./helpers";
import palette from "./palette";

const button: ThemeType["button"] = {
  extend: () => `
    background-color: ${palette.text.primary};
    color: ${palette.background.primary};
    font-weight: bold;
    text-align: center;
    padding: 12px 24px;
    border-radius: 26px;
    transition: ${getTransition(["transform", "background"])};

    &:hover, &:focus {
      transform: scale(1.02);
    }

    &:active {
      background: ${palette.text.weak};
      transform: scale(1);
    }
  `,
  primary: {
    extend: () => `
      background-color: ${palette.brand.primary};
      color: ${palette.background.primary};

      &:active {
        background: ${palette.brand.contrast};
      }
  `,
  },
};
export default button;
