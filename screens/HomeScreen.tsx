import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Button from './components/Button';

const HomeScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../appLogo.png')} style={styles.appLogo} />
      <TextInput
        style={styles.userData}
        placeholder="USERNAME"
        onChangeText={newText => setUsername(newText)}
        defaultValue={username}
      />
      <TextInput
        style={styles.userData}
        placeholder="PASSWORD"
        onChangeText={newText => setPassword(newText)}
        defaultValue={password}
      />
      <TouchableOpacity style={styles.forgotPasswordView} onPress={() => {}}>
        <Text style={styles.forgotPassword}>forgot password</Text>
      </TouchableOpacity>
      <Button navigation={navigation} navigateTo="Persons" text="SIGN IN"/>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 42,
  },
  appLogo: {
    marginTop: 100,
    marginBottom: 130,
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  userData: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    fontSize: 16,
  },
  forgotPasswordView: {
    alignSelf: 'flex-end',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    textTransform: 'uppercase',
    color: 'gray',
  },
});

export default HomeScreen;
