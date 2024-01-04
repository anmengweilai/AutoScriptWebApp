import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => ({
  container:css`
    display: flex;
    width: 100%;
    height: calc(100vh - 50px);
  `,
  menus:css`
    width: 50px;
    height: 100%;
    background: ${token.colorBorderBg};
    overflow: auto;
  `,
  menuItem:css`
    width: 50px;

  `

}));
