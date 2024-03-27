/**
 *creation time:2024/3/27
 *author: anmengweilai
 */

import React from 'react';

export interface ConfigColumn {
  key: React.Key;
  title: string;
  dataIndex: string;
  valueType?: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'time' | 'select' | 'multiSelect' | 'input' | 'textarea';
  valueEnum?: Record<string, any>;
}

export interface ConfigFormProps {
  dataSource?: Record<any, any>[];
  columns?: ConfigColumn[];
}

const ConfigForm: React.FC<ConfigFormProps> = (props) => {

  const {} = props;

  return (
    <>

    </>
  );
};

export default ConfigForm;
