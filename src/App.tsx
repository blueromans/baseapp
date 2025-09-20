// Local Components and Hooks
import './i18n';
import { NavigationContainer, StoreWrapper } from './navigation';

const ApplicationNavigator = () => null;

// Main component
const App = () => (
  <NavigationContainer>
    <StoreWrapper>
      <ApplicationNavigator />
    </StoreWrapper>
  </NavigationContainer>
);

export default App;
