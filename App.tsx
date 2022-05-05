import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RnCamera from './screens/RnCamera';
import PersonDetails from './screens/PersonDetails';
import Persons from './screens/Persons';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Persons" component={Persons} />
        <Stack.Screen name="PersonDetails" component={PersonDetails} />
        <Stack.Screen name="RnCamera" component={RnCamera} />
      </Stack.Navigator>
    </NavigationContainer>
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    </>
  );
};

export default App;
