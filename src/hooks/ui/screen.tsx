// React and React Native
import { useMemo } from 'react';

// Components and Hooks
import { useTypedSelector } from '@/store';

// Global Types
import type { TabIconProps } from '@/types';

// Assets
import Home from '../../assets/icons/Home';
import Account from '../../assets/icons/Account';

export type TabRoute = {
  name: string;
  title?: string;
  options?: any;
  icon: (props: TabIconProps) => React.ReactElement;
};

export type Route = {
  title?: string | null;
  name: string;
  options?: any;
};

export type RouteGroup = {
  options: null | { presentation: string };
  routes: Route[];
};

export const useTabRoutes: () => TabRoute[] = () => {
  return useMemo(
    () => [
      {
        name: 'Home',
        title: 'Home',
        icon: (props: TabIconProps) => <Home {...props} />,
      },
      {
        name: 'Profile',
        title: 'Profile',
        icon: (props: TabIconProps) => <Account {...props} />,
      },
    ],
    [],
  );
};

export const useMainRoutes = (): RouteGroup[] => {
  const { isAuthenticated } = useTypedSelector(state => state.authentication);
  return useMemo(() => {
    const routes = [
      {
        options: null,
        routes: [{ name: 'TabNavigator' }],
      },
      /*{
        options: { presentation: 'fullScreenModal' },
        routes: [{ name: 'CountryList' }, { name: 'MyEsimDetail' }],
      },*/
    ];
    if (!isAuthenticated) {
      routes[0].routes.unshift({ name: 'SignIn' }, { name: 'SignUp' });
    }
    return routes;
  }, [isAuthenticated]);
};
