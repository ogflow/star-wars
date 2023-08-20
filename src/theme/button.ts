import { ThemeType } from "grommet";
import { getTransition } from "./helpers";
import palette from "./palette";

const button: ThemeType["button"] = {
  primary: {
    extend: () => `
      font-weight: bold;
      text-align: center;
      padding: 12px 24px;
      border-radius: 26px;
      background-color: ${palette.brand.primary};
      color: ${palette.background.primary};
      transition: ${getTransition(["transform", "background"])};

      &:active {
        background: ${palette.brand.contrast};
        transform: scale(1);
      }
  
      &:hover, &:focus {
        transform: scale(1.02);
      }
  `,
  },
};
export default button;
