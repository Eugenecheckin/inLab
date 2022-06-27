import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

import Persons from '../screens/Poke/Persons';
import TabBar from '../screens/PokeTab/TabBar';
import PersonsTitle from './components/PersonsTitle';

import { useAppDispatch } from '../store/storeHook';
import { storeLoginData } from '../utils/asyncStore';
import authApi from '../api/authApi';

const Tab = createBottomTabNavigator();

const PokeTab = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const getToken = async () => {
    try {
      await AsyncStorage.getItem('token').then(async val => {
        if (val === null) {
          navigation.navigate('Auth');
        } else {
          const responce = await authApi.getLogin(val);
          await storeLoginData(responce.data.token);
          dispatch({
            type: 'auth/setUser',
            payload: {
              email: responce.data.email,
              name: responce.data.name,
            },
          });
        }
      });
    } catch (err) {
      const customErr = err as Error;
      showMessage({
        message: `${customErr.message}`,
        type: 'info',
      });
      navigation.navigate('Auth');
    }
  };
  useEffect(() => {
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
