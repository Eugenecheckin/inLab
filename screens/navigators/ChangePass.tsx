import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import ChangeRequest from '../ChangePassStack/ChangeRequest';
import EmailConfirm from '../ChangePassStack/EmailConfirm';
import PassConfirm from '../ChangePassStack/PassConfirm';
import { AppStackParamList } from '../../App';

const Stack = createNativeStackNavigator();
type ScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'ChangePass'>

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
