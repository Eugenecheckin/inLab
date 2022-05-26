import React from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { removeLoginData } from '../../store/asyncStore';

const TabBar: React.FC<BottomTabBarProps> = ({ navigation }) => {
  const isNoticed = useSelector(({ pokeApi }) => pokeApi.isNoticed);
  return (
    <View style={styles.sectionContainer} >
      <TouchableOpacity
        onPress={ async () => {
          await removeLoginData();
          navigation.navigate('Auth');
        }}
      >
        <MaterialCommunityIcons name="logout" color="#576270" size={25} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons name="comment-multiple-outline" color="#576270" size={25} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons name="magnify" color="#576270" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('RnCamera');
        }}
      >
        <MaterialCommunityIcons name="camera" color="#576270" size={25} />
      </TouchableOpacity>
      <TouchableOpacity>
        {isNoticed ? (
          <MaterialCommunityIcons name="bell-badge" color="#576270" size={25} />
        ) : (
          <MaterialCommunityIcons name="bell" color="#576270" size={25} />
        )
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 25,
    left: 10,
    right: 10,
    height: 80,
    borderRadius: 20,
    paddingTop: 25,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default TabBar;
