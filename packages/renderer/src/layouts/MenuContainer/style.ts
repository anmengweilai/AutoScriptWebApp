import { createStyles } from 'antd-style';

export default createStyles(({ css, token }) => ({
  container:css`
    display: flex;
    width: 100%;
    height: calc(100vh - 50px);
  `,
  menus:css`
    height: 100%;
    background: ${token.colorBorderBg};
    overflow: auto;
    width: 72px;
    padding-top: ${token.padding}px;
  `,
  menuItem:css`
    width: 100%;

  `,
  menuTitle:css`

  `

}));
