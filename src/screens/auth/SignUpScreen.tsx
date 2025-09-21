// React and React Native
import { useState } from 'react';
import { TextInput } from 'react-native';

// Third Party Libraries
import { useNavigation } from '@react-navigation/native';

// Components and Hooks
import { Block, Typography } from '@/components';
import { useThemeColors } from '@/theme';
import { size } from '@/utils/helpers/size';

const SignUpScreen = () => {
  const colors = useThemeColors();
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    console.log('Sign up with:', { name, email, password, confirmPassword });
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <Block flex={1} padding={size(24)}>
      <Block flex={1}>
        {/* Form */}
        <Block marginTop={size(24)}>
          {/* Name Input */}
          <Block marginBottom={size(16)}>
            <Typography variant="label" marginBottom={size(8)}>
              Full Name
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
                placeholder="Enter your name"
                placeholderTextColor={colors.text.secondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </Block>
          </Block>

          {/* Email Input */}
          <Block marginBottom={size(16)}>
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
          <Block marginBottom={size(16)}>
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
                placeholder="Create a password"
                placeholderTextColor={colors.text.secondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </Block>
          </Block>

          {/* Confirm Password Input */}
          <Block marginBottom={size(16)}>
            <Typography variant="label" marginBottom={size(8)}>
              Confirm Password
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
                placeholder="Confirm your password"
                placeholderTextColor={colors.text.secondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </Block>
          </Block>

          {/* Sign Up Button */}
          <Block
            onPress={handleSignUp}
            color={colors.brand.primary}
            radius={8}
            padding={size(14)}
            center
            marginTop={size(24)}
          >
            <Typography variant="button" color="#FFFFFF">
              Sign Up
            </Typography>
          </Block>
        </Block>

        {/* Footer */}
        <Block row center marginTop={size(32)}>
          <Typography variant="body2" color={colors.text.secondary}>
            Already have an account?{' '}
          </Typography>
          <Block onPress={handleSignIn}>
            <Typography
              variant="body2"
              color={colors.brand.primary}
              weight="600"
            >
              Sign In
            </Typography>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default SignUpScreen;
