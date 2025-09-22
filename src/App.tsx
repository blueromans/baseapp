// React and React Native
import React from 'react';

// Local Components and Hooks
import './i18n';
import { Container, StoreWrapper, RootNavigator } from './navigation';

const App: React.FC = () => (
  <Container>
    <StoreWrapper>
      <RootNavigator />
    </StoreWrapper>
  </Container>
);

export default React.memo(App);
