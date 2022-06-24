import React from 'react';
// import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  // NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Login from '../screens/Account/Login';
// import { RootStackParamList } from './RootNavigator';

const Stack = createNativeStackNavigator();
// type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>

const Auth = () => {
  // const { navigation } = useNavigation<ScreenNavigationProp>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Auth;
