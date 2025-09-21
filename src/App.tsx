// Local Components and Hooks
import './i18n';
import { NavigationContainer, StoreWrapper, RootNavigator } from './navigation';

const App = () => {
  // TODO: Replace with actual auth state from your store/context

  return (
    <NavigationContainer>
      <StoreWrapper>
        <RootNavigator isAuthenticated={true} />
      </StoreWrapper>
    </NavigationContainer>
  );
};

export default App;
