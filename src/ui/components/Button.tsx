import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Props = {
  onPress?: ()=>void,
  text: string
}
const Button = ({ onPress, text }: Props) => {
  return (
    <View>
      {onPress && (<TouchableOpacity
        style={styles.buttonArrea}
        onPress={onPress}>
        <Text style={styles.text}>
          {text}
        </Text>
      </TouchableOpacity>)}
    </View>
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

