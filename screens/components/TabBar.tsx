import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation, isNoticed }) => {
  /* const isNoticed = useSelector(({ pokeApi }) => pokeApi.isNoticed); */
  return (
    <View style={styles.sectionContainer} >
      {/* {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 5 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })} */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <MaterialCommunityIcons name="login" color="#576270" size={25} />
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
