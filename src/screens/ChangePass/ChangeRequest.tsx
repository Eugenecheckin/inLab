import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import { showMessage } from 'react-native-flash-message';

import Input from '../../ui/components/input/Input';
import Button from '../../ui/components/button/Button';
import appLogo from '../../assets/images/appLogo.png';

import changePassApi from '../../api/changePassApi';
import styles from './changeRequest.style';

type RootStackParamList = {
  ChangeRequest: undefined;
  EmailConfirm: { email: string };
  PassConfirm: { secret: string };
};

const ChangeRequest: React.FC<NativeStackScreenProps<RootStackParamList, 'ChangeRequest'>> = ({ navigation }) => {

  const [email, setEmail] = useState('');

  const sendControlHandler = async () => {
    try {
      const result = await changePassApi.forgotPass({ email });
      showMessage({
        message: result.data.message,
        type: 'info',
      });
      navigation.navigate('EmailConfirm', { email });
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
      <Image
        source={appLogo}
        style={styles.appLogo}
      />
      <Input
        placeholder="Email"
        onChange={text => setEmail(text)}
        defaultValue={email}
      />
      <Button
        onPress={sendControlHandler}
        text="send control to email"
        viewStyles={styles.viewButton}
      />
    </View>
  );
};

export default ChangeRequest;
