import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import { AxiosError } from 'axios';

import Input from '../../ui/components/input/Input';
import Button from '../../ui/components/button/Button';
import appLogo from '../../assets/images/appLogo.png';

import changePassApi from '../../api/changePassApi';
import styles from './emailConfirm.style';

type RootStackParamList = {
  ChangeRequest: undefined;
  EmailConfirm: { email: string };
  PassConfirm: { secret: string };
};

const EmailConfirm: React.FC<NativeStackScreenProps<RootStackParamList, 'EmailConfirm'>> = ({ navigation }) => {
  const [secret, setSecret] = useState('');

  const sendControlHandler = async () => {
    try {
      const res = await changePassApi.confirmEmail({ secret });
      if (res.data.message) {
        showMessage({
          message: res.data.message,
          type: 'info',
        });
        navigation.navigate('PassConfirm', { secret });
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        showMessage({
          message: e.response.data.message,
          type: 'danger',
        });
      }
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Image source={appLogo} style={styles.appLogo} />
      <Input
        placeholder="Confirm"
        onChange={newText => setSecret(newText)}
        defaultValue={secret}
      />
      <Button
        onPress={sendControlHandler}
        text="Enter confirm"
        viewStyles={styles.viewButton}
      />
    </View>
  );
};

export default EmailConfirm;
