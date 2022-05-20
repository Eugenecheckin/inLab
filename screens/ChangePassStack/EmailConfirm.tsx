import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { confirmEmail } from '../../api/changePassApi';
import appLogo from '../../img/appLogo.png';

import ManualButton from '../components/ManualButton';

const EmailConfirm: React.FC<NativeStackScreenProps> = ({ navigation }) => {
  const [secret, setSecret] = useState('');

  const sendControlHendler = async () => {
    const res = await confirmEmail({ secret });
    if (res.data.email) {
      navigation.navigate('PassConfirm', { secret });
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Image source={appLogo} style={styles.appLogo} />
      <TextInput
        autoCapitalize="none"
        style={styles.userData}
        placeholder="Confirm"
        onChangeText={newText => setSecret(newText)}
        defaultValue={secret}
      />
      <ManualButton callback={sendControlHendler} text="Enter confirm"/>
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

export default EmailConfirm;
