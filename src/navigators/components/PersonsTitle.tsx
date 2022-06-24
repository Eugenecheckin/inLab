import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Filter from '../../assets/images/Filter.svg';
// import { RootStackParamList } from '../RootNavigator';
import { isVisible } from '../../store/poke/reduser';
import styles from './personTitle.Style';

// type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Poke'>

const PersonsTitle = () => {
  const dispatch = useDispatch();
  // const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.title}>
        Persons
      </Text>
      <TouchableOpacity
        style={styles.filterIcon}
        onPress={() => { dispatch(isVisible()); }}
      >
        <Filter width={25} height={25} />
      </TouchableOpacity>
    </View>
  );
};

export default PersonsTitle;
