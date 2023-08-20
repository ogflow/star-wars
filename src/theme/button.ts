import palette from "./palette";

const button = {
  extend: () => `
    background-color: ${palette.brand.primary};
    color: ${palette.background.primary};
    font-weight: bold;
    text-align: center;
    padding: 11px 16px;
    border-radius: 25px;
    transition: all 0.125s ease;

    &:hover {
      transform: scale(1.02);
    }

    &:active {
      background: ${palette.brand.contrast};
      transform: scale(1);
    }
  `,
};
export default button;
