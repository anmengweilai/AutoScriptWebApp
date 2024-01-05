import { createStyles } from 'antd-style';

export default createStyles(({ css, }) => ({
  container:css`
    display: flex;
    width: 100%;
    height: calc(100vh - 50px);
  `,
  divider:css`
    height: 100%;
    padding: 0;
    margin: 0;
  `

}));
