import React from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { removeLoginData } from '../../store/asyncStore';
import Out from '../../assets/images/Out.svg';
import Comment from '../../assets/images/Comment.svg';
import Magnifier from '../../assets/images/Magnifier.svg';
import Camera from '../../assets/images/Camera.svg';

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
        <Out width={32} height={32}/>
        {/* <MaterialCommunityIcons name="logout" color="#576270" size={25} /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        <Comment width={32} height={32}/>
        {/* <MaterialCommunityIcons name="comment-multiple-outline" color="#576270" size={25} /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        <Magnifier width={32} height={32}/>
        {/* <MaterialCommunityIcons name="magnify" color="#576270" size={25} /> */}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SimpleCam');
        }}
      >
        <Camera width={32} height={32}/>
        {/* <MaterialCommunityIcons name="camera" color="#576270" size={25} /> */}
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
    borderWidth: 1,
    borderColor: 'rgba(5, 0, 0, .1)',
    borderRadius: 20,
    paddingTop: 25,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default TabBar;
