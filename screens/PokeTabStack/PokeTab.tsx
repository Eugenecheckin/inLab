import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Persons from '../PokeStack/Persons';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

const PokeTab = ({ navigation }) => {

  const getToken = async () => {
    try {
      await AsyncStorage.getItem('token').then(val => {
        if (val === null) {
          console.log(val);
          navigation.navigate('Login');
        } else { console.log(val); }
      });
    } catch {
      console.log('bax');
    }
  };

  useEffect(()=> {
    getToken();
  }, []);

  const isNoticed = useSelector((state) => state.pokeApi.isNoticed);

  return (
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} isNoticed={isNoticed} />}
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

