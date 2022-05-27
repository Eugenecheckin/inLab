import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from './screens/navigators/Auth';
import ChangePass from './screens/navigators/ChangePass';
import Poke from './screens/navigators/Poke';

import store from './store/store';

export type AppStackParamList = {
  Auth: undefined;
  Poke: {token: string};
  ChangePass: undefined;
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Poke">
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
          <Stack.Screen name="Poke" component={Poke} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePass" component={ChangePass} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
