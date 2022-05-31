import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import PersonDetails from '../screens/Poke/PersonDetails';
import PokeTab from './PokeTab';
import RnCamera from '../screens/Poke/RnCamera';
import { RootStackParamList } from './RootNavigator';

const Stack = createNativeStackNavigator();
type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Poke'>

const Poke = () => {
  const { navigation } = useNavigation<ScreenNavigationProp>();
  return (
    <Stack.Navigator initialRouteName="PersonsWithTab">
      <Stack.Screen
            name="PersonsWithTab"
            component={PokeTab}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen name="PersonDetails" component={PersonDetails} options={{ headerShown: false }} />
          <Stack.Screen name="RnCamera" component={RnCamera} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Poke;
