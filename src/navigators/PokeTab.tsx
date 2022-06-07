import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Persons from '../screens/Poke/Persons';
import TabBar from '../screens/PokeTab/TabBar';
import PersonsTitle from './components/PersonsTitle';

const Tab = createBottomTabNavigator();

const PokeTab = ({ navigation }) => {
  const getToken = async () => {
    try {
      await AsyncStorage.getItem('token').then(val => {
        if (val === null) {
          navigation.navigate('Auth');
        }
      });
    } catch {
      console.log('bax');
    }
  };
  useEffect(()=> {
    getToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        initialRouteName="Persons"
      >
      <Tab.Screen
        name="Persons"
        component={Persons}
        options={{ headerTitle: (props) => <PersonsTitle {...props} /> }}
      />
    </Tab.Navigator>
  );
};

export default PokeTab;
