import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {TabView} from 'react-native-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const styles = StyleSheet.create({
  person: {
    marginTop: 10,
    marginBottom: 10,
    width: 150,
    height: 150,
    alignSelf: 'flex-start',
  },
  signIn: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginTop: 50,
    borderRadius: 50,
  },
  signInText: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: 'white',
    fontSize: 20,
  },
});

const Front = ({ source }) => (
  <Image
    source={{
      uri: source,
    }}
    style={styles.person}
  />
);
const Back = ({ source }) => (
  <Image
    source={{
      uri: source,
    }}
    style={styles.person}
  />
);
const FrontShiny = ({ source }) => (
  <Image
    source={{
      uri: source,
    }}
    style={styles.person}
  />
);
const BackShiny = ({ source }) => (
  <Image
    source={{
      uri: source,
    }}
    style={styles.person}
  />
);
const renderScene = ({ route }) => {
  switch (route.key) {
    case 'front':
      console.log(route.source);
      return <Front source={route.source} />;
    case 'back':
      console.log(route.source);
      return <Back source={route.source} />;
    case 'frontShiny':
      console.log(route.source);
      return <FrontShiny source={route.source} />;
    case 'backShiny':
      console.log(route.source);
      return <BackShiny source={route.source} />;
    default:
      return <Text>Test</Text>;
  }
};

const PersonDetails = ({route, navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {
      key: 'front',
      title: '',
    },
    {
      key: 'back',
      title: '',
    },
    {
      key: 'frontShiny',
      title: '',
    },
    {
      key: 'backShiny',
      title: '',
    },
  ]);
  useFocusEffect(
    React.useCallback(() => {
      const { source } = route.params;
      console.log(source);
      setRoutes(
        [
          {
            key: 'back',
            title: '',
            source: source.back,
          },
          {
            key: 'front',
            title: '',
            source: source.front,
          },
          {
            key: 'frontShiny',
            title: '',
            source: source.frontShiny,
          },
          {
            key: 'backShiny',
            title: '',
            source: source.BackShiny,
          },
        ]
      );
    }, [])
    );

  const { name } = route.params;
  return (
    <View style={{ flex: 1}}>
      <TouchableOpacity
        style={styles.signIn}
        onPress={() => navigation.navigate("RnCamera")}
      >
        <Text style={styles.signInText}>Camera</Text>
      </TouchableOpacity>
      <Text>{name}</Text>
      <TabView
        navigationState={{index: 0, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </View>
  );
};

export default PersonDetails;
