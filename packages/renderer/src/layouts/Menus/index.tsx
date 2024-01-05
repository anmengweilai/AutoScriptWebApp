/**
 *creation time:2024/1/5
 *author: anmengweilai
 */
import React from 'react'
import {Flex, Menu, MenuProps} from "antd";
import useStyles from "./style";

type MenusProps = MenuProps

const Menus: React.FC<MenusProps> = (props) => {
  const {} = props;

  const {styles} = useStyles();

  return (
    <Flex className={styles.menus}>
      <Menu className={styles.menus} items={[
        {
          title: '主页',
          key: 'home',
          label: '主页',
        },
        {
          label: '编辑',
          key: 'edit',
        },
        {
          label: '管理',
          key: 'mage',
        },
      ]}/>
    </Flex>
  );
};

export default Menus;
