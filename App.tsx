import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RnCamera from './screens/RnCamera';
import PersonDetails from './screens/PersonDetails';
import Persons from './screens/Persons';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Persons" component={Persons} />
        <Stack.Screen name="PersonDetails" component={PersonDetails} />
        <Stack.Screen name="RnCamera" component={RnCamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
