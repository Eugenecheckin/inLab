import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Button = ({ navigation, navigateTo, text }) => {
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
    marginTop: 50,
    borderRadius: 50,
  },
  text: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: 'white',
    fontSize: 20,
  },
});

export default Button;

