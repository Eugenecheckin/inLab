import React from 'react';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import RootNavigator from './navigators/RootNavigator';
import { store } from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
