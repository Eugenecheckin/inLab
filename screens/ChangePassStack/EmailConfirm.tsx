import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { confirmEmail } from '../../api/changePassApi';
import ManualButton from '../components/ManualButton';
import appLogo from '../../img/appLogo.png';

type RootStackParamList = {
  ChangeRequest: undefined;
  EmailConfirm: {email: string};
  PassConfirm: { secret: string };
};

const EmailConfirm: React.FC<NativeStackScreenProps<RootStackParamList, 'EmailConfirm'>> = ({ navigation }) => {
  const [secret, setSecret] = useState('');

  const sendControlHendler = async () => {
    const res = await confirmEmail({ secret });
    if (res.data.email) {
      navigation.navigate('PassConfirm', { secret });
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Image source={appLogo} style={styles.appLogo} />
      <TextInput
        autoCapitalize="none"
        style={styles.enterConfirm}
        placeholder="Confirm"
        onChangeText={newText => setSecret(newText)}
        defaultValue={secret}
      />
      <ManualButton callback={sendControlHendler} text="Enter confirm"/>
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
  enterConfirm: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    fontSize: 16,
  },
});

export default EmailConfirm;
