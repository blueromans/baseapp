// React and React Native
import * as React from 'react';

// Third Party Libraries
import Svg, { Path } from 'react-native-svg';

// Components and Hooks
import { useTheme } from '@/theme';

interface Props {
  size?: number;
  color?: string;
}

function Account({ size = 22, color }: Props) {
  const { colors } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 17 20" fill="none">
      <Path
        d="M8.08897 10.6185H8.12097C11.049 10.6185 13.43 8.23751 13.43 5.30951C13.43 2.38151 11.049 -0.000488281 8.12097 -0.000488281C5.19197 -0.000488281 2.80997 2.38151 2.80997 5.30651C2.79997 8.22651 5.16697 10.6095 8.08897 10.6185ZM4.23797 5.30951C4.23797 3.16851 5.97997 1.42751 8.12097 1.42751C10.261 1.42751 12.002 3.16851 12.002 5.30951C12.002 7.44951 10.261 9.19151 8.12097 9.19151H8.09197C5.95997 9.18351 4.23097 7.44351 4.23797 5.30951Z"
        fill={color || colors.primary}
      />
      <Path
        d="M0.199951 16.1728C0.199951 19.8699 6.16195 19.8699 8.12095 19.8699C11.52 19.8699 16.04 19.4888 16.04 16.1929C16.04 12.4958 10.08 12.4958 8.12095 12.4958C4.72095 12.4958 0.199951 12.8769 0.199951 16.1728ZM1.69995 16.1728C1.69995 14.7278 3.85995 13.9958 8.12095 13.9958C12.381 13.9958 14.54 14.7348 14.54 16.1929C14.54 17.6378 12.381 18.3699 8.12095 18.3699C3.85995 18.3699 1.69995 17.6308 1.69995 16.1728Z"
        fill={color || colors.primary}
      />
    </Svg>
  );
}

export default Account;
