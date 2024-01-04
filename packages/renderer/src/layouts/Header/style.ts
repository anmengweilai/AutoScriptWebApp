import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => ({
  header:css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    background: ${token.colorBorderBg};
    padding: ${token.paddingSM}px;
  `,
  loading:css`
    scale: 1.6;
    margin-left: ${token.marginSM}px;
    color: ${token.colorSuccess};

  `
}));
