import { ThemeType } from "grommet";
import { getTransition } from "./helpers";
import palette from "./palette";

const card: ThemeType["card"] = {
  container: {
    extend: () => `
      box-shadow: none;
      border: 1px solid ${palette.border};
      background: ${palette.background.front};
      position: relative;
      transition: 
        ${getTransition(["background", "transform"], "0.25s")}, 
        ${getTransition("box-shadow", "0.5s", "ease-in-out")};

      &:after {
        visibility: hidden;
        content: "";
        top: 0;
        transform: translateX(100%);
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        animation: slide 4s infinite;
        background: linear-gradient(
          100deg, 
          rgba(255,255,255,0) 20%,
          rgba(255,255,255,0.6) 50%,
          rgba(128,186,232,0) 90%,
          rgba(125,185,232,0) 100%
        );
      }

      &:hover {
        background: ${palette.background.contrast};
        box-shadow: 0px 2px 8px 2px ${palette.extra.blueGlow};
        transform: scale(1.02);
        animation: cardGlowing 2s infinite;

        &:after {
          visibility: visible;
        }
      }

      &:active {
        transform: scale(1);
      }

      @keyframes cardGlowing {
        0%, 100% {
          box-shadow: 0px 2px 8px px ${palette.extra.blueGlow};
        }
        50% {
          box-shadow: 0px 2px 16px 8px ${palette.extra.violetGlow};
        }
      }
      
      @keyframes slide {
        0% {transform:translateX(-100%);}
        33% {transform:translateX(100%);}
      }
    `,
  },
};

export default card;
