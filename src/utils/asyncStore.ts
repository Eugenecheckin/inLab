import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLoginData = async (token: string) => {
  try {
    await AsyncStorage.setItem(
      'token',
      token,
    );
  } catch {
  }
};

export const removeLoginData = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch {
  }
};


