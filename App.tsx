import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store/store';

import RnCamera from './screens/PokeStack/RnCamera';
import PersonDetails from './screens/PokeStack/PersonDetails';
import Login from './screens/AccountStack/Login';
import ChangePass from './screens/ChangePassStack/ChangePass';
import PokeTab from './screens/PokeTabStack/PokeTab';


export type AppStackParamList = {
  Login: undefined;
  Persons: undefined;
  ForgotPass: undefined;
};

const Stack = createNativeStackNavigator();

function isShowHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Persons';

  switch (routeName) {
    case 'Persons':
      return false;
    case 'Home':
      return false;
    case 'RnCamera':
      return false;
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Persons">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen
            name="Persons"
            component={PokeTab}
            options={({ route }) => ({
              headerShown: isShowHeaderTitle(route),
            })}
          />
          <Stack.Screen name="PersonDetails" component={PersonDetails} options={{ headerShown: false }} />
          <Stack.Screen name="RnCamera" component={RnCamera} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePass" component={ChangePass} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
