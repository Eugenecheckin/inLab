import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import { AxiosError } from 'axios';

import Input from '../../ui/components/input/Input';
import Button from '../../ui/components/button/Button';
import appLogo from '../../assets/images/appLogo.png';

import authApi from '../../api/authApi';
import { useAppDispatch } from '../../store/storeHook';
import { storeLoginData } from '../../utils/asyncStore';
import styles from './login.style';

type RootStackParamList = {
  Login: undefined;
  Persons: undefined;
  ChangePass: undefined;
}

interface ILoginData {
  email: string;
  password: string;
}

const Login: React.FC<NativeStackScreenProps<RootStackParamList, 'Login'>> = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const loginHandler = async (value: ILoginData) => {
    try {
      const responce = await authApi.postSignIn(value);
      await storeLoginData(responce.data.token);
      dispatch({
        type: 'auth/setUser',
        payload: {
          email: responce.data.email,
          name: responce.data.name,
        },
      });
      showMessage({
        message: 'welcome',
        type: 'info',
      });
      navigation.navigate('Persons');
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        showMessage({
          message: err.response.data.message,
          type: 'info',
        });
      }
    }
  };

  const forgotHandler = () => {
    setEmail('');
    setPassword('');
    navigation.navigate('ChangePass');
  };

  return (
    <View style={styles.sectionContainer}>
      <Image
        source={appLogo}
        style={styles.appLogo}
      />
      <Input
        placeholder="EMAIL"
        onChange={(newText) => setEmail(newText)}
        defaultValue={email}
      />
      <Input
        placeholder="PASSWORD"
        onChange={(newText) => setPassword(newText)}
        defaultValue={password}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.touchFogotPass}
        onPress={forgotHandler}
      >
        <Text style={styles.textForgotPass}>
          forgot password
        </Text>
      </TouchableOpacity>
      <Button
        onPress={() => loginHandler({ email, password })}
        text="Login"
      />
    </View>
  );
};

export default Login;
