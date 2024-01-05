/**
 *creation time:2024/1/5
 *author: anmengweilai
 */
import React, {useMemo, useState} from 'react'
import {Flex, Space, Typography} from "antd";
import useStyles from "./style";
import {nanoid} from "nanoid";


export interface AsideItem {
  title: string;
  icon?: React.ReactElement;
  key?: React.Key;
}

interface AsideProps {
  items?: AsideItem[]
}

const {Text} = Typography;

const Aside: React.FC<AsideProps> = (props) => {
  const {items: propsItems} = props;


  const items = useMemo<AsideItem[] | undefined>(() => {

    return propsItems?.map(item => {
      let _icon = null;
      if (item.icon) {
        _icon = React.cloneElement(item.icon, {
          style: {
            fontSize: 30
          }
        })
      }

      return {
        ...item,
        icon: _icon || <></>,
        key: item.key || nanoid()
      }
    })

  }, [propsItems]);


  const {styles, cx} = useStyles();

  const [activate, setActivate] = useState<React.Key>(items?.[0].key || '');

  const handleActivate = (key: React.Key) => {
    setActivate(key);
  }


  return (
    <Flex vertical className={styles.asideContainer}>
      <Space size={'small'} direction={'vertical'} className={styles.asideSpace} >
        {items?.map((item) => {
          return (
            <Flex
              vertical
              justify={'center'}
              align={'center'}
              key={item.key}
              onClick={() => handleActivate(item.key as React.Key)}
              className={cx(styles.asideItem,activate === item.key && styles.asideSelected)}
            >
              {item.icon}
              <Text className={styles.asideTitle}>{item.title}</Text>
            </Flex>
          )
        })}
      </Space>
    </Flex>
  );
};

export default Aside;
