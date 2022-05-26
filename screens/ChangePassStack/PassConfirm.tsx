import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { confirmPass } from '../../api/changePassApi';
import ManualButton from '../components/ManualButton';
import appLogo from '../../img/appLogo.png';

type RootStackParamList = {
  ChangeRequest: undefined;
  EmailConfirm: {email: string};
  PassConfirm: { secret: string };
  Auth: undefined;
};

const PassConfirm: React.FC<NativeStackScreenProps<RootStackParamList,'PassConfirm'>> = ({ navigation, route }) => {
  const { secret} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const sendControlHendler = async () => {
    if ( password !== confirmPassword ) {
      console.log("Entered password don't equal");
    } else {
      const res = await confirmPass({ password, secret });
      if (res.data.result) {
        navigation.navigate('Auth');
      }
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Image source={appLogo} style={styles.appLogo} />
      <TextInput
        secureTextEntry={true}
        autoCapitalize="none"
        style={styles.userData}
        placeholder="New Password"
        onChangeText={newText => setPassword(newText)}
        defaultValue={password}
      />
      <TextInput
        secureTextEntry={true}
        autoCapitalize="none"
        style={styles.userData}
        placeholder="Confirm Password"
        onChangeText={newText => setConfirmPassword(newText)}
        defaultValue={confirmPassword}
      />
      <ManualButton callback={sendControlHendler} text="Enter new password"/>
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

export default PassConfirm;
