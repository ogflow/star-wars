import { ThemeType } from "grommet";
import { getTransition } from "./helpers";
import palette from "./palette";

const card: ThemeType["card"] = {
  container: {
    extend: () => `
      &.person-specification--mammal {
        --classification-color: ${palette.extra.mammal.primary};
        --classification-color-contrast:  ${palette.extra.mammal.contrast};
      }
      &.person-specification--artifical {
        --classification-color: ${palette.extra.artifical.primary};
        --classification-color-contrast:  ${palette.extra.artifical.contrast};
      }
      &.person-specification--sentient {
        --classification-color: ${palette.extra.sentient.primary};
        --classification-color-contrast:  ${palette.extra.sentient.contrast};
      }
      &.person-specification--gastropod {
        --classification-color: ${palette.extra.gastropod.primary};
        --classification-color-contrast:  ${palette.extra.gastropod.contrast};
      }
      &.person-specification--reptile {
        --classification-color: ${palette.extra.reptile.primary};
        --classification-color-contrast:  ${palette.extra.reptile.contrast};
      }
      &.person-specification--amphibian {
        --classification-color: ${palette.extra.amphibian.primary};
        --classification-color-contrast:  ${palette.extra.amphibian.contrast};
      }
      &.person-specification--insectoid {
        --classification-color: ${palette.extra.insectoid.primary};
        --classification-color-contrast:  ${palette.extra.insectoid.contrast};
      }

      box-shadow: none;
      border: 1px solid ${palette.border};
      background: ${palette.background.front};
      position: relative;
      transition: 
        ${getTransition(["background", "transform"], "0.25s")}, 
        ${getTransition("box-shadow", "0.5s", "ease-out")};

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
        box-shadow: 
          0px 2px 8px 2px 
          var(--classification-color, ${palette.brand.primary});
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
          box-shadow: 
            0px 2px 8px 2px 
            var(--classification-color, ${palette.brand.primary});
        }
        50% {
          box-shadow: 
            0px 2px 16px 12px 
            var(--classification-color-contrast, ${palette.brand.contrast})
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
