import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import { AxiosError } from 'axios';

import Input from '../../ui/components/input/Input';

import changePassApi from '../../api/changePassApi';
import Button from '../../ui/components/button/Button';
import appLogo from '../../assets/images/appLogo.png';
import styles from './passConfirm.Style';

type RootStackParamList = {
  ChangeRequest: undefined;
  EmailConfirm: { email: string };
  PassConfirm: { secret: string };
  Auth: undefined;
};

const PassConfirm: React.FC<NativeStackScreenProps<RootStackParamList, 'PassConfirm'>> = ({ navigation, route }) => {
  const { secret } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const sendControlHandler = async () => {
    if (password !== confirmPassword) {
      showMessage({
        message: 'Введенные пароли не совпадают',
        type: 'warning',
      });
    } else {
      try {
        const res = await changePassApi.confirmPass({ password, secret });
        showMessage({
          message: res.data.message,
          type: 'info',
        });
        navigation.navigate('Auth');
      } catch (e) {
        if (e instanceof AxiosError && e.response) {
          showMessage({
            message: e.response.data.message,
            type: 'danger',
          });
        }
      }
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Image source={appLogo} style={styles.appLogo} />
      <Input
        secureTextEntry={true}
        placeholder="New Password"
        onChange={text => setPassword(text)}
        defaultValue={password}
      />
      <Input
        secureTextEntry={true}
        placeholder="Confirm Password"
        onChange={text => setConfirmPassword(text)}
        defaultValue={confirmPassword}
      />
      <Button
        onPress={sendControlHandler}
        text="Enter new password"
        viewStyles={styles.viewButton}
      />
    </View>
  );
};

export default PassConfirm;
