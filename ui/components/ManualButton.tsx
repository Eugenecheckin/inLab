import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ManualButton: React.FC<{text: string, callback: void}> = ({ text, callback }) => {
  return (
    <TouchableOpacity
      style={styles.buttonArrea}
      onPress={callback}>
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonArrea: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c8c9cd',
    borderRadius: 50,
    height: 36,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default ManualButton;

