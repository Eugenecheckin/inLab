import React from 'react';
import { useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import PersonDetails from '../PokeStack/PersonDetails';
import PokeTab from '../PokeTabStack/PokeTab';
import RnCamera from '../PokeStack/RnCamera';
import { AppStackParamList } from '../../App';

const Stack = createNativeStackNavigator();
type ScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Persons'>

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

const Poke = () => {
  const { navigation } = useNavigation<ScreenNavigationProp>();
  return (
    <Stack.Navigator initialRouteName="PersonsWithTab">
      <Stack.Screen
            name="PersonsWithTab"
            component={PokeTab}
            options={({ route }) => ({
              headerShown: isShowHeaderTitle(route),
            })}
          />
          <Stack.Screen name="PersonDetails" component={PersonDetails} options={{ headerShown: false }} />
          <Stack.Screen name="RnCamera" component={RnCamera} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Poke;
