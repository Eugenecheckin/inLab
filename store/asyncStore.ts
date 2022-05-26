import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLoginData = async (value: {token: string, email: string, name: string}) => {
  try {
    await AsyncStorage.setItem(
      'token',
      value.token,
    );
    await AsyncStorage.setItem(
      'email',
      value.email,
    );
    await AsyncStorage.setItem(
      'name',
      value.name,
    );
  } catch {
  }
};

export const removeLoginData = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('name');
  } catch {
  }
};


