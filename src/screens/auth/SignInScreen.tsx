// React and React Native
import { useState } from 'react';
import { TextInput } from 'react-native';

// Third Party Libraries
import { useNavigation } from '@react-navigation/native';

// Components and Hooks
import { Block, Typography } from '@/components';
import { useThemeColors } from '@/theme';
import { size } from '@/utils';

const SignInScreen = () => {
  const colors = useThemeColors();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Sign in with:', { email, password });
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Block flex={1} padding={size(24)} keyboard>
      {/* Form */}
      <Block marginTop={size(32)}>
        {/* Email Input */}
        <Block marginBottom={size(20)}>
          <Typography variant="label" marginBottom={size(8)}>
            Email
          </Typography>
          <Block
            outlined
            radius={8}
            padding={size(14)}
            color={colors.background.secondary}
          >
            <TextInput
              style={{
                fontSize: 16,
                color: colors.text.primary,
              }}
              placeholder="Enter your email"
              placeholderTextColor={colors.text.secondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Block>
        </Block>

        {/* Password Input */}
        <Block marginBottom={size(20)}>
          <Typography variant="label" marginBottom={size(8)}>
            Password
          </Typography>
          <Block
            outlined
            radius={8}
            padding={size(14)}
            color={colors.background.secondary}
          >
            <TextInput
              style={{
                fontSize: 16,
                color: colors.text.primary,
              }}
              placeholder="Enter your password"
              placeholderTextColor={colors.text.secondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </Block>
        </Block>

        {/* Sign In Button */}
        <Block
          onPress={handleSignIn}
          color={colors.brand.primary}
          radius={8}
          padding={size(14)}
          center
          marginTop={size(24)}
        >
          <Typography variant="button" color="#FFFFFF">
            Sign In
          </Typography>
        </Block>

        {/* Forgot Password */}
        <Block
          onPress={() => console.log('Forgot password')}
          center
          marginTop={size(16)}
        >
          <Typography variant="body2" color={colors.brand.primary}>
            Forgot Password?
          </Typography>
        </Block>
      </Block>

      {/* Footer */}
      <Block row center marginTop={size(32)}>
        <Typography variant="body2" color={colors.text.secondary}>
          Don't have an account?{' '}
        </Typography>
        <Block onPress={handleSignUp}>
          <Typography variant="body2" color={colors.brand.primary} weight="600">
            Sign Up
          </Typography>
        </Block>
      </Block>
    </Block>
  );
};

export default SignInScreen;
