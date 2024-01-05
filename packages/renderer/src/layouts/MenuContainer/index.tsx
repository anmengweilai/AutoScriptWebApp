/**
 *creation time:2024/1/4
 *author: anmengweilai
 */
import React, {useMemo} from 'react'
import useStyles from "./style";
import {DesktopOutlined, PlaySquareOutlined, SettingOutlined} from "@ant-design/icons";
import Aside from "@/layouts/Aside";
import Menus from "@/layouts/Menus";
import {Divider} from "antd";

interface MenuContainerProps {
  children: React.ReactNode;
}


const MenuContainer: React.FC<MenuContainerProps> = (props) => {
  const {children} = props;
  const {styles} = useStyles();


  const menuList = useMemo(() => [
    {
      title: '主页',
      icon: <DesktopOutlined  />
    },
    {
      icon: <PlaySquareOutlined />,
      title: '编辑'
    },
    {
      title: '管理',
      icon: <SettingOutlined />
    },
  ], []);

  return (
    <div className={styles.container}>
     <Aside items={menuList} />
      <Divider type={'vertical'} />
      <Menus />
      {children}
    </div>
  );
};

export default MenuContainer;
