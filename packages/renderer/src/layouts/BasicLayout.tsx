import {useThemeStore} from '@/store/theme';
import {App} from 'antd';
import {ThemeProvider} from 'antd-style';
import 'antd/dist/reset.css';
import type {FC, PropsWithChildren} from 'react';

import useStyles from './style';
import Header from "@/layouts/Header";
import MenuContainer from "@/layouts/MenuContainer";

const BasicLayout: FC<PropsWithChildren> = ({children}) => {
  // const {themeMode} = useThemeStore();

  const {styles} = useStyles();

  // const switchDarkMode = () => {
  //   useThemeStore.setState({
  //     themeMode: themeMode === 'light' ? 'dark' : 'light',
  //   });
  // };
  return (
    <App className={styles.container}>
      <Header/>
      <MenuContainer>
        {children}
      </MenuContainer>
    </App>
  );
};

export default ({children}: PropsWithChildren) => {
  const {themeMode} = useThemeStore();

  return (
    <ThemeProvider themeMode={themeMode}>
      <BasicLayout>{children}</BasicLayout>
    </ThemeProvider>
  );
};
