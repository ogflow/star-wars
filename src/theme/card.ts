import { ThemeType } from "grommet";
import palette from "./palette";

const card: ThemeType["card"] = {
  container: {
    extend: () => `
      box-shadow: none;
      border: 1px solid ${palette.border};
      background: ${palette.background.front};
      position: relative;
    `,
  },
};

export default card;
