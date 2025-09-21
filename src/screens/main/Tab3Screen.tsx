// React and React Native
import { useState } from 'react';
import { ScrollView, Switch } from 'react-native';

// Components and Hooks
import { Block, Typography, Card } from '@/components';
import { useThemeColors } from '@/theme';
import { size } from '@/utils/helpers/size';

const Tab3Screen = () => {
  const colors = useThemeColors();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: '👤', label: 'Profile', action: () => console.log('Profile') },
        { icon: '🔒', label: 'Privacy', action: () => console.log('Privacy') },
        {
          icon: '🛡️',
          label: 'Security',
          action: () => console.log('Security'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: '🔔',
          label: 'Notifications',
          toggle: true,
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: '🌙',
          label: 'Dark Mode',
          toggle: true,
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          icon: '💾',
          label: 'Auto-Save',
          toggle: true,
          value: autoSave,
          onChange: setAutoSave,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: '❓', label: 'Help Center', action: () => console.log('Help') },
        {
          icon: '📧',
          label: 'Contact Us',
          action: () => console.log('Contact'),
        },
        {
          icon: '📄',
          label: 'Terms & Privacy',
          action: () => console.log('Terms'),
        },
      ],
    },
  ];

  return (
    <Block flex={1} color={colors.background.primary}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block padding={size(16)}>
          {settingsGroups.map((group, groupIndex) => (
            <Block key={groupIndex} marginBottom={size(24)}>
              <Typography
                variant="caption"
                color={colors.text.secondary}
                marginBottom={size(12)}
                marginLeft={size(4)}
              >
                {group.title.toUpperCase()}
              </Typography>

              <Card variant="elevated" padding={0}>
                {group.items.map((item, itemIndex) => (
                  <Block
                    key={itemIndex}
                    onPress={item.action}
                    padding={size(16)}
                    row
                    align="center"
                    justify="space-between"
                    style={{
                      borderBottomWidth:
                        itemIndex < group.items.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border.default,
                    }}
                  >
                    <Block row align="center" flex={1}>
                      <Typography variant="h3" marginRight={size(12)}>
                        {item.icon}
                      </Typography>
                      <Typography variant="body1" weight="500">
                        {item.label}
                      </Typography>
                    </Block>

                    {item.toggle ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onChange}
                        trackColor={{
                          false: colors.interactive.disabled as string,
                          true: colors.brand.primary as string,
                        }}
                        thumbColor={item.value ? '#FFFFFF' : '#F4F4F4'}
                      />
                    ) : (
                      <Typography variant="h3" color={colors.text.tertiary}>
                        ›
                      </Typography>
                    )}
                  </Block>
                ))}
              </Card>
            </Block>
          ))}

          {/* Sign Out Button */}
          <Card variant="elevated" marginTop={size(8)} padding={0}>
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

          {/* App Version */}
          <Block center marginTop={size(24)} marginBottom={size(32)}>
            <Typography variant="caption" color={colors.text.tertiary}>
              Version 1.0.0
            </Typography>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default Tab3Screen;
