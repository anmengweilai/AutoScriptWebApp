import type { FC } from 'react';
import { Typography} from 'antd';
import { Center, Flexbox } from 'react-layout-kit';


import useAppEvent from '@/hooks/useAppEvent';

import useStyles from './style';

const Home: FC = () => {
  const { styles } = useStyles();
  useAppEvent(
    'initDatabase',
    (e) => {
      console.log(e.data);
    },
    [],
  );

  return (
    <Center className={styles.container}>
      <Flexbox align={'center'}>
        <Typography.Text>Test</Typography.Text>
      </Flexbox>
    </Center>
  );
};

export default Home;
