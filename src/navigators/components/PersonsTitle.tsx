import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import Filter from '../../assets/images/Filter.svg';

import { isVisible } from '../../store/poke/reduser';
import styles from './personTitle.Style';

const PersonsTitle = () => {
  const dispatch = useDispatch();
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
