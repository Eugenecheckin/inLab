import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ManualButton from '../components/ManualButton';

import appLogo from '../../img/appLogo.png';
import { postLogin } from '../../api';
import storeLoginData from '../../store/asyncStore';

const Login = ({ navigation }) => {

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHendler = async (value) => {
    try {
      const responce = await postLogin(value);
      console.log(responce.data.token);
      await storeLoginData(responce.data);
      navigation.navigate('Persons');
    } catch { console.log('babaX'); }
  };
  return (
    <View style={styles.sectionContainer}>
      <Image source={appLogo} style={styles.appLogo} />
      <TextInput
        autoCapitalize="none"
        style={styles.userData}
        placeholder="EMAIL"
        onChangeText={newText => setUsername(newText)}
        defaultValue={email}
      />
      <TextInput
        secureTextEntry={true}
        autoCapitalize="none"
        style={styles.userData}
        placeholder="PASSWORD"
        onChangeText={newText => setPassword(newText)}
        defaultValue={password}
      />
      <TouchableOpacity style={styles.forgotPasswordView} onPress={() => {}}>
        <Text style={styles.forgotPassword}>forgot password</Text>
      </TouchableOpacity>
      <ManualButton callback={() => loginHendler({email, password})} text="Login"/>
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

export default Login;
