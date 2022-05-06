import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RnCamera from './screens/RnCamera';
import PersonDetails from './screens/PersonDetails';
import Persons from './screens/Persons';
import HomeScreen from './screens/HomeScreen';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    initialRouteName="Persons"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          position: 'absolute',
          bottom: 25,
          left: 10,
          right: 10,
          height: 80,
          borderRadius: 20,
        },
       }}
      >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false ,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color="#576270" size={25} />
          ),
        }}/>
      <Tab.Screen
        name="Persons"
        component={Persons}
        options={{
          headerShown: false ,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="compass" color="#576270" size={25} />
          ),
        }}/>
      <Tab.Screen
        name="PersonDetails"
        component={PersonDetails}
        options={{
          headerShown: false ,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="magnify" color="#576270" size={25} />
          ),
        }}/>
      <Tab.Screen
        name="RnCamera"
        component={RnCamera}
        options={{
          headerShown: false ,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="camera" color="#576270" size={25} />
          ),
        }}/>
    </Tab.Navigator>
  );
}


const App = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Persons" component={Persons} />
        <Stack.Screen name="PersonDetails" component={PersonDetails} />
        <Stack.Screen name="RnCamera" component={RnCamera} />
      </Stack.Navigator> */}
      <MyTabs />
    </NavigationContainer>
  );
};

export default App;
