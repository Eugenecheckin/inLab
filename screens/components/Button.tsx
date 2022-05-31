import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


const Button: React.FC<{ navigateTo: string, text: string, navigation: any}>  = ({ navigation, navigateTo, text }) => {
  return (
    <TouchableOpacity
      style={styles.buttonArrea}
      onPress={() => navigation.navigate(navigateTo)}>
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonArrea: {
    alignItems: 'center',
    backgroundColor: '#c8c9cd',
    marginTop: 5,
    borderRadius: 50,
  },
  text: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    color: 'white',
    fontSize: 20,
  },
});

export default Button;

