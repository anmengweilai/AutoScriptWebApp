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
  items?: AsideItem[],
  defaultActivate?: React.Key;
}

const {Text} = Typography;

const Aside: React.FC<AsideProps> = (props) => {
  const {items: propsItems,defaultActivate} = props;


  const {styles, cx} = useStyles();

  const [activate, setActivate] = useState<React.Key>(defaultActivate || '');

  const handleActivate = (key: React.Key) => {
    setActivate(key);
  }

  const items = useMemo<AsideItem[] | undefined>(() => {

    return propsItems?.map(item => {
      return {
        ...item,
        key: item.key || nanoid()
      }
    })

  }, [propsItems]);


  return (
    <Flex vertical className={styles.asideContainer}>
      <Space size={'small'} direction={'vertical'} className={styles.asideSpace}>
        {items?.map((item) => {
          return (
            <Flex
              vertical
              justify={'center'}
              align={'center'}
              key={item.key}
              onClick={() => handleActivate(item.key as React.Key)}
              className={cx(styles.asideItem, activate === item.key && styles.asideSelected)}
            >
              {item.icon && React.cloneElement(item.icon, {
                className: activate === item.key && styles.asideIconSelected,
                style: {
                  fontSize: 30,
                }
              })}
              <Text className={styles.asideTitle}>{item.title}</Text>
            </Flex>
          )
        })}
      </Space>
    </Flex>
  );
};

export default Aside;
