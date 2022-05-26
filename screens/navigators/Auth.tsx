import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Login from '../AccountStack/Login';
import { AppStackParamList } from '../../App';

const Stack = createNativeStackNavigator();
type ScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Poke'>

const Auth = () => {
  const { navigation } = useNavigation<ScreenNavigationProp>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Auth;
