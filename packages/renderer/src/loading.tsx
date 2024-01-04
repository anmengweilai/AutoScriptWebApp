/**
 *creation time:2024/1/4
 *author: anmengweilai
 */
import React from 'react'
import {Spin} from "antd";

interface LoadingProps {
  children?: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const {children} = props;
  return (
    <Spin>
      {children}
    </Spin>
  );
};

export default Loading;
