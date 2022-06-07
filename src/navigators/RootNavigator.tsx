import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import ChangePass from './ChangePass';
import Poke from './Poke';
import SwipeTab from './SwipeTab';

export type RootStackParamList = {
  Auth: undefined;
  Poke: undefined;
  ChangePass: undefined;
  SwipeTab: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Poke">
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="Poke" component={Poke} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePass" component={ChangePass} options={{ headerShown: false }} />
        <Stack.Screen name="SwipeTab" component={SwipeTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
