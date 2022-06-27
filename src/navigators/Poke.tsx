import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PersonDetails from '../screens/Poke/PersonDetails';
import PokeTab from './PokeTab';
import SimpleCam from '../screens/Poke/SimpleCam';

const Stack = createNativeStackNavigator();

const Poke = () => {
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
      <Stack.Screen name="SimpleCam" component={SimpleCam} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Poke;
