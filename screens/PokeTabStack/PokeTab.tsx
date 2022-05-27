import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Persons from '../PokeStack/Persons';
import TabBar from './TabBar';

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
      />
    </Tab.Navigator>
  );
};

export default PokeTab;
