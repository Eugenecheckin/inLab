import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { forgotPass } from '../../api/changePassApi';
import ManualButton from '../components/ManualButton';

import appLogo from '../../img/appLogo.png';

type RootStackParamList = {
  ChangeRequest: undefined;
  EmailConfirm: {email: string};
  PassConfirm: { secret: string };
};

const ChangeRequest: React.FC<NativeStackScreenProps<RootStackParamList,'ChangeRequest'>> = ({ navigation }) => {

  const [email, setEmail] = useState('');

  const sendControlHendler = async () => {
    navigation.navigate('EmailConfirm', { email });
    await forgotPass({ email });
  };

  return (
    <View style={styles.screenContainer}>
      <Image source={appLogo} style={styles.appLogo} />
      <TextInput
        autoCapitalize="none"
        style={styles.enterEmail}
        placeholder="Email"
        onChangeText={newText => setEmail(newText)}
        defaultValue={email}
      />
      <ManualButton callback={sendControlHendler} text="send control to email"/>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
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
  enterEmail: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    fontSize: 16,
  },
});

export default ChangeRequest;
