import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Out from '../../assets/images/Out.svg';
import Comment from '../../assets/images/Comment.svg';
import Magnifier from '../../assets/images/Magnifier.svg';
import Camera from '../../assets/images/Camera.svg';

import { useRootSelector, useAppDispatch } from '../../store/storeHook';
import { removeLoginData } from '../../utils/asyncStore';
import styles from './tabBar.Style';

const TabBar: React.FC<BottomTabBarProps> = ({ navigation }) => {
  const isNoticed = useRootSelector(({ poke }) => poke.isNoticed);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.sectionContainer} >
      <TouchableOpacity
        onPress={async () => {
          await removeLoginData();
          dispatch({
            type: 'auth/setUser',
            payload: {
              email: '',
              name: '',
            },
          });
          navigation.navigate('Auth');
        }}
      >
        <Out
          width={32}
          height={32}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Comment
          width={32}
          height={32}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Magnifier
          width={32}
          height={32}
        />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={async () => {
        navigation.navigate('SimpleCam');
      }}
      >
        <Camera
          width={32}
          height={32}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        {isNoticed ? (
          <MaterialCommunityIcons
            name="bell-badge"
            color="#576270"
            size={25}
          />
        ) : (
          <MaterialCommunityIcons
            name="bell"
            color="#576270"
            size={25}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
