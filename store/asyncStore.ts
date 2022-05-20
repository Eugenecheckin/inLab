import AsyncStorage from '@react-native-async-storage/async-storage';

const storeLoginData = async (value) => {
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

export default storeLoginData;


