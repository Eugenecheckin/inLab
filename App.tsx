import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector } from 'react-redux';
import store from './store/store';

import RnCamera from './screens/RnCamera';
import PersonDetails from './screens/PersonDetails';
import Persons from './screens/Persons';
import Login from './screens/account/Login';
import TabBar from './screens/components/TabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function isShowHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Persons';

  switch (routeName) {
    case 'Persons':
      return false;
    case 'Home':
      return false;
    case 'RnCamera':
      return false;
  }
}

function MyTabs() {
  const isNoticed = useSelector((state) => state.pokeApi.isNoticed);
  console.log("message", isNoticed);
  
  return (
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} isNoticed={isNoticed} />}
        initialRouteName="Persons"
        /* screenOptions={{
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
        }} */
      >
      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false ,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color="#576270" size={25} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Persons"
        component={Persons}
        /* options={{
          headerShown: true,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="compass" color="#576270" size={25} />
          ),
        }} */
      />
      {/* <Tab.Screen
        name="RnCamera"
        component={RnCamera}
        options={{
          headerShown: false ,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="camera" color="#576270" size={25} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen
            name="Persons"
            component={MyTabs}
            options={({ route }) => ({
              headerShown: isShowHeaderTitle(route),
            })} />
          <Stack.Screen name="PersonDetails" component={PersonDetails} options={{ headerShown: false }} />
          <Stack.Screen name="RnCamera" component={RnCamera} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
