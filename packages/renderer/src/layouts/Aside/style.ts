import { createStyles } from 'antd-style';

export default createStyles(({ css, token,prefixCls }) => ({
   asideContainer:css`
    height: 100%;
    background: ${token.colorBorderBg};
    overflow: auto;
    width: 72px;
    padding-top: ${token.padding}px;
  `,


  asideSpace:css`

    & > .${prefixCls}-space-item {
      display: flex;
      justify-content: flex-end;
      text-align: right;
    }

  `,

  asideItem:css`
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    transition: transform 0.3s;

    &:hover > .${prefixCls}-typography {
      color: ${token.colorPrimaryHover};
    }

    &:hover > .asideIcon {
      color: ${token.colorPrimaryHover};
    }

    &:after {
      content: '';
      position: absolute;
      left: 0px;
      top: 0;
      width: 4px;
      height: 100%;
      background: ${token.colorPrimaryHover};
      transform: translateX(-100%);
      transition: transform 0.3s;
    }

  `,

  asideTitle:css`
    font-size: ${token.fontSizeSM}px;
  `,

  asideIconSelected:css`
    color: ${token.colorPrimaryHover}
  `,

  asideSelected:css`
    &:after {
      transform: translateX(0);
    }

    & > .${prefixCls}-typography {
      color: ${token.colorPrimaryHover};
    }



  `





}));
