// React and React Native
import { ScrollView } from 'react-native';

// Components and Hooks
import { Block, Typography, Card } from '@/components';
import { useThemeColors } from '@/theme';
import { size } from '@/utils/helpers/size';

const Tab4Screen = () => {
  const colors = useThemeColors();

  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Premium Member',
    joined: 'January 2024',
    avatar: '👤',
  };

  const profileStats = [
    { label: 'Posts', value: '42' },
    { label: 'Followers', value: '1.2K' },
    { label: 'Following', value: '234' },
  ];

  const menuItems = [
    {
      icon: '✏️',
      label: 'Edit Profile',
      action: () => console.log('Edit Profile'),
    },
    {
      icon: '🎨',
      label: 'Appearance',
      action: () => console.log('Appearance'),
    },
    {
      icon: '🔔',
      label: 'Notifications',
      action: () => console.log('Notifications'),
    },
    {
      icon: '💳',
      label: 'Subscription',
      action: () => console.log('Subscription'),
    },
    { icon: '📊', label: 'Analytics', action: () => console.log('Analytics') },
    { icon: '🎁', label: 'Rewards', action: () => console.log('Rewards') },
  ];

  return (
    <Block flex={1} color={colors.background.secondary}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Block
          color={colors.background.primary}
          padding={size(24)}
          align="center"
        >
          {/* Avatar */}
          <Block
            width={100}
            height={100}
            radius={50}
            color={colors.background.elevated}
            center
            marginBottom={size(16)}
          >
            <Typography variant="h1">{userInfo.avatar}</Typography>
          </Block>

          {/* User Info */}
          <Typography variant="h2" weight="bold" marginBottom={size(4)}>
            {userInfo.name}
          </Typography>
          <Typography
            variant="body2"
            color={colors.text.secondary}
            marginBottom={size(4)}
          >
            {userInfo.email}
          </Typography>
          <Block
            color={colors.brand.primary}
            padding={size(4)}
            paddingHorizontal={size(12)}
            radius={12}
            marginTop={size(8)}
          >
            <Typography variant="caption" color="#FFFFFF" weight="600">
              {userInfo.role}
            </Typography>
          </Block>
        </Block>

        {/* Stats */}
        <Block
          row
          justify="space-around"
          padding={size(16)}
          color={colors.background.primary}
        >
          {profileStats.map((stat, index) => (
            <Block key={index} align="center">
              <Typography variant="h3" weight="bold" marginBottom={size(4)}>
                {stat.value}
              </Typography>
              <Typography variant="caption" color={colors.text.secondary}>
                {stat.label}
              </Typography>
            </Block>
          ))}
        </Block>
        <Block height={1} color={colors.border.default} />

        {/* Menu Items */}
        <Block padding={size(16)}>
          <Card variant="elevated" padding={0}>
            {menuItems.map((item, index) => (
              <>
                <Block
                  key={index}
                  onPress={item.action}
                  padding={size(16)}
                  row
                  align="center"
                  justify="space-between"
                >
                  <Block row align="center">
                    <Typography variant="h3" marginRight={size(12)}>
                      {item.icon}
                    </Typography>
                    <Typography variant="body1" weight="500">
                      {item.label}
                    </Typography>
                  </Block>
                  <Typography variant="h3" color={colors.text.tertiary}>
                    ›
                  </Typography>
                </Block>
                {index < menuItems.length - 1 && (
                  <Block height={1} color={colors.border.default} />
                )}
              </>
            ))}
          </Card>
        </Block>

        {/* Account Actions */}
        <Block padding={size(16)} paddingTop={0}>
          <Card variant="elevated" padding={0}>
            <Block
              onPress={() => console.log('Share Profile')}
              padding={size(16)}
              center
            >
              <Typography
                variant="body1"
                color={colors.brand.primary}
                weight="600"
              >
                Share Profile
              </Typography>
            </Block>
            <Block height={1} color={colors.border.default} />
            <Block
              onPress={() => console.log('Sign Out')}
              padding={size(16)}
              center
            >
              <Typography
                variant="body1"
                color={colors.status.error}
                weight="600"
              >
                Sign Out
              </Typography>
            </Block>
          </Card>
        </Block>

        {/* Footer */}
        <Block center padding={size(16)} marginBottom={size(16)}>
          <Typography variant="caption" color={colors.text.tertiary}>
            Member since {userInfo.joined}
          </Typography>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default Tab4Screen;
