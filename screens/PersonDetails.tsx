import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';

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
      return <Front source={route.source} />;
    case 'back':
      return <Back source={route.source} />;
    case 'frontShiny':
      return <FrontShiny source={route.source} />;
    case 'backShiny':
      return <BackShiny source={route.source} />;
    default:
      return null;
  }
};

const PersonDetails = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
      const { source } = route.params;
      setRoutes([
        {
          key: 'back',
          title: 'Back',
          source: source.back,
        },
        {
          key: 'front',
          title: 'Front',
          source: source.front,
        },
        {
          key: 'frontShiny',
          title: 'Front Shiny',
          source: source.frontShiny,
        },
        {
          key: 'backShiny',
          title: 'Back Shiny',
          source: source.backShiny,
        },
      ]);
    }, [route.params]);

  const { name } = route.params;
  return (
    <View style={styles.screenLayout} >
      <TouchableOpacity
        style={styles.signIn}
        onPress={() => navigation.navigate('RnCamera')}
      >
        <Text style={styles.signInText}>Camera</Text>
      </TouchableOpacity>
      <TabView
        style={styles.personTabImage}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
      <Text style={styles.titleText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
  },
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
  titleText: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  personTabImage: {
    flex: 1,
  },
});

export default PersonDetails;
