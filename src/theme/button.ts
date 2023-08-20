import { ThemeType } from "grommet";
import { getTransition } from "./helpers";
import palette from "./palette";

const button: ThemeType["button"] = {
  extend: () => `
    background-color: ${palette.brand.primary};
    color: ${palette.background.primary};
    font-weight: bold;
    text-align: center;
    padding: 11px 16px;
    border-radius: 25px;
    transition: ${getTransition(["transform", "background"])};

    &:hover, &:focus {
      transform: scale(1.02);
    }

    &:active {
      background: ${palette.brand.contrast};
      transform: scale(1);
    }
  `,
};
export default button;
