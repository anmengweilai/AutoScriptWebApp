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
      icon: <DesktopOutlined  />,
      key: 'home',
    },
    {
      icon: <PlaySquareOutlined />,
      title: '编辑',
      key: 'edit',
    },
    {
      title: '管理',
      icon: <SettingOutlined />,
      key: 'management',
    },
  ], []);

  return (
    <div className={styles.container}>
     <Aside items={menuList} defaultActivate={'home'} />
      <Divider className={styles.divider} type={'vertical'} />
      <Menus items={[]} />
      {children}
    </div>
  );
};

export default MenuContainer;
