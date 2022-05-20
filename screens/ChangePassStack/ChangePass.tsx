import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import ChangeRequest from './ChangeRequest';
import EmailConfirm from './EmailConfirm';
import PassConfirm from './PassConfirm';
import { AppStackParamList } from '../../App';

const Stack = createNativeStackNavigator();
type ScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'ForgotPass'>

const ChangePass = () => {
  const { navigation } = useNavigation<ScreenNavigationProp>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChangeRequest" component={ChangeRequest} options={{ headerShown: false }} />
      <Stack.Screen name="EmailConfirm" component={EmailConfirm} options={{ headerShown: false }} />
      <Stack.Screen name="PassConfirm" component={PassConfirm} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ChangePass;
