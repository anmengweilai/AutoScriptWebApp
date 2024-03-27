/**
 *creation time:2024/3/21
 *author: anmengweilai
 */

import React from 'react';
import {Button, ButtonProps, List, ListProps} from "antd";

interface TaskItemData {
  title: string;
  description: string;
  buttonProps?: {
    onClick?: () => void;
    children?: React.ReactNode;
  } & ButtonProps;
  renderContent?: () => React.ReactNode;
}

interface TaskListProps<T extends Record<any, any>> extends ListProps<T>{
  itemProps?: any;
  dataSource?: T[];
}

function TaskList<T extends TaskItemData> (props:TaskListProps<T>) {
  const {dataSource,...rest }= props;

  const renderItem = (item: T) => {
    const {buttonProps, renderContent} = item;
    return <List.Item>
      <List.Item.Meta
        title={item.title}
        description={item.description}
      />
      {renderContent?.() ||  <Button {...buttonProps}>{buttonProps?.children}</Button>}
    </List.Item>
  };

  return (
    <List renderItem={renderItem} {...rest} dataSource={dataSource} />
  );
}

export default TaskList;
