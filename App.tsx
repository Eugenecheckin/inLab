import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store/store';

import Auth from './screens/navigators/Auth';
import ChangePass from './screens/navigators/ChangePass';
import Poke from './screens/navigators/Poke';


export type AppStackParamList = {
  Auth: undefined;
  Poke: undefined;
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
