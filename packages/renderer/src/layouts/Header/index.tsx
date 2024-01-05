/**
 *creation time:2024/1/4
 *author: anmengweilai
 */
import React from 'react'
import useStyles from "./style";
import {Avatar, Button, Space, Typography} from 'antd';
import {
  BorderOutlined,
  CloseOutlined, LoadingOutlined,
  MinusOutlined, ArrowDownOutlined
} from "@ant-design/icons";

interface HeaderProps {
  title?: string | React.ReactNode;
  headerTitle?: string | React.ReactNode;
  status?: 'loading' | 'time-out' | 'error';
}

const {Title} = Typography;

const Header: React.FC<HeaderProps> = (props) => {
  const {title = 'app', headerTitle = 'MBCC'} = props;

  const {styles} = useStyles();


  // @ts-ignore
  return (
    <div className={styles.header}>
      <Space>
        <Avatar shape={'circle'} size={42}>
          MBCC
        </Avatar>
        <Title style={{marginBottom: 0}} level={3}>{headerTitle}</Title>
        <LoadingOutlined spin className={styles.loading}/>
      </Space>

      <Title level={5}>{title}</Title>

      <Space size={'small'}>
        <Button type={'text'} icon={<ArrowDownOutlined/>}/>
        <Button type={'text'} icon={<MinusOutlined/>}/>
        <Button type={'text'} icon={<BorderOutlined/>}/>
        <Button type={'text'} icon={<CloseOutlined/>}/>
      </Space>
    </div>
  );
};

export default Header;
