import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { forgotPass } from '../../api/changePassApi';
import appLogo from '../../img/appLogo.png';

import ManualButton from '../components/ManualButton';

type RootStackParamList = {
  ChangeRequest: undefined;
  EmailConfirm: {email: string};
  PassConfirm: { secret: string };
};

const ChangeRequest: React.FC<NativeStackScreenProps<RootStackParamList,'ChangeRequest'>> = ({ navigation }) => {

  const [email, setEmail] = useState('');

  const sendControlHendler = async () => {
    console.log(email);
    navigation.navigate('EmailConfirm', { email });
    await forgotPass({ email });
  };

  return (
    <View style={styles.sectionContainer}>
      <Image source={appLogo} style={styles.appLogo} />
      <TextInput
        autoCapitalize="none"
        style={styles.userData}
        placeholder="Email"
        onChangeText={newText => setEmail(newText)}
        defaultValue={email}
      />
      <ManualButton callback={sendControlHendler} text="send control to email"/>
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

export default ChangeRequest;
