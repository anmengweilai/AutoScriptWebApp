/**
 *creation time:2024/1/4
 *author: anmengweilai
 */
import React from 'react'
import {Spin, SpinProps} from "antd";

interface LoadingProps extends SpinProps {
  children?: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const {children, spinning = true, ...rest} = props;
  return (
    <Spin spinning={spinning} {...rest}>
      {children}
    </Spin>
  );
};

export default Loading;
