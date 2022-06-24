import React from 'react';
import { TextInput } from 'react-native';
import styles from './input.Style';

interface IProps {
  placeholder: string;
  defaultValue: string;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
}

// eslint-disable-next-line no-undef
const Input = ({ placeholder, defaultValue, onChange, secureTextEntry }: IProps): JSX.Element => {

  return (
    <TextInput
      secureTextEntry={secureTextEntry || undefined}
      autoCapitalize="none"
      style={styles.userData}
      placeholder={placeholder}
      onChangeText={(text) => onChange(text)}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
