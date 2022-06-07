import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function SignIn({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Auth')}
        title="Go to authorization"
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const SwipeTab = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="SignIn" component={SignIn} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default SwipeTab;


