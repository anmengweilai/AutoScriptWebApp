/**
 *creation time:2024/1/4
 *author: anmengweilai
 */
import React from 'react'
import useStyles from "./style";

interface MenuContainerProps {
  children: React.ReactNode;
}

const MenuContainer: React.FC<MenuContainerProps> = (props) => {
  const {children} = props;
  const {styles} = useStyles();

  const menu = [
    {
      type: 'menu',
      title: 'menu1',
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.menus}>
        {menu.map((item) => {
          return (
            <div key={item.title} className={styles.menuItem}>
              {item.title}
            </div>
          )
        })}
      </div>
      {children}
    </div>
  );
};

export default MenuContainer;
