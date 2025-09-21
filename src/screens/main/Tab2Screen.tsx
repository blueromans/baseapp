// React and React Native
import { ScrollView } from 'react-native';

// Components and Hooks
import { DetailTemplate, Block, Typography, Card } from '@/components';
import { useThemeColors } from '@/theme';
import { size } from '@/utils/helpers/size';

const Tab2Screen = () => {
  const colors = useThemeColors();

  const stats = [
    { label: 'Total Items', value: '1,234', icon: '📊' },
    { label: 'Active Users', value: '567', icon: '👥' },
    { label: 'Revenue', value: '$12.5K', icon: '💰' },
    { label: 'Growth', value: '+23%', icon: '📈' },
  ];

  const actions = [
    {
      text: 'View Reports',
      onPress: () => console.log('View Reports'),
      variant: 'primary' as const,
    },
    {
      text: 'Export Data',
      onPress: () => console.log('Export Data'),
      variant: 'secondary' as const,
    },
  ];

  return (
    <DetailTemplate actions={actions}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <Block marginBottom={size(24)}>
          <Typography variant="h3" marginBottom={size(16)}>
            Quick Stats
          </Typography>
          <Block row wrap justify="space-between">
            {stats.map((stat, index) => (
              <Card
                key={index}
                variant="outlined"
                width="48%"
                padding={16}
                marginBottom={size(12)}
              >
                <Block row align="center" marginBottom={size(8)}>
                  <Typography variant="h2">{stat.icon}</Typography>
                </Block>
                <Typography variant="h3" weight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="caption" color={colors.text.secondary}>
                  {stat.label}
                </Typography>
              </Card>
            ))}
          </Block>
        </Block>

        {/* Recent Activity */}
        <Block marginBottom={size(24)}>
          <Typography variant="h3" marginBottom={size(16)}>
            Recent Activity
          </Typography>
          <Card variant="elevated" padding={16}>
            <Block marginBottom={size(12)}>
              <Typography variant="body1" weight="600">
                New user registered
              </Typography>
              <Typography variant="caption" color={colors.text.secondary}>
                2 minutes ago
              </Typography>
            </Block>
            <Block marginBottom={size(12)}>
              <Typography variant="body1" weight="600">
                Order #1234 completed
              </Typography>
              <Typography variant="caption" color={colors.text.secondary}>
                15 minutes ago
              </Typography>
            </Block>
            <Block marginBottom={size(12)}>
              <Typography variant="body1" weight="600">
                Payment received: $450
              </Typography>
              <Typography variant="caption" color={colors.text.secondary}>
                1 hour ago
              </Typography>
            </Block>
          </Card>
        </Block>

        {/* Charts Placeholder */}
        <Block marginBottom={size(24)}>
          <Typography variant="h3" marginBottom={size(16)}>
            Performance Chart
          </Typography>
          <Card variant="elevated" padding={16} height={200} center>
            <Typography variant="h1">📊</Typography>
            <Typography
              variant="body2"
              color={colors.text.secondary}
              marginTop={size(8)}
            >
              Chart visualization would go here
            </Typography>
          </Card>
        </Block>
      </ScrollView>
    </DetailTemplate>
  );
};

export default Tab2Screen;
