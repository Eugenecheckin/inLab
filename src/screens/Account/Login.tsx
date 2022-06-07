import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import appLogo from '../../assets/images/appLogo.png';
import postLogin from '../../api/authApi';
import { storeLoginData } from '../../store/asyncStore';

import ManualButton from '../../ui/components/ManualButton';

type RootStackParamList = {
  Login: undefined;
  Persons: undefined;
  ChangePass: undefined;
}
const Login: React.FC<NativeStackScreenProps<RootStackParamList,'Login'>> = ({ navigation }) => {

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  interface ILoginData {
    email: string;
    password: string;
  }
  const loginHendler = async (value: ILoginData) => {
    try {
      const responce = await postLogin(value);
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
      <TouchableOpacity style={styles.touchFogotPass} onPress={() => {navigation.navigate('ChangePass');}}>
        <Text style={styles.textForgotPass}>forgot password</Text>
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
  touchFogotPass: {
    alignSelf: 'flex-end',
    marginBottom: 50,
  },
  textForgotPass: {
    textTransform: 'uppercase',
    color: 'gray',
  },
});

export default Login;
