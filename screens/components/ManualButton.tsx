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
    alignItems: 'center',
    backgroundColor: '#c8c9cd',
    marginTop: 50,
    borderRadius: 50,
  },
  text: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    color: 'white',
    fontSize: 20,
  },
});

export default ManualButton;

