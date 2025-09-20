// React and React Native
import React, { memo } from 'react';

// Third Party Libraries
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Assets
import { persistor, store } from '@/store';

interface StoreWrapperProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

const StoreWrapper: React.FC<StoreWrapperProps> = ({
  children,
  loadingComponent = null,
}) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={loadingComponent}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default memo(StoreWrapper);
