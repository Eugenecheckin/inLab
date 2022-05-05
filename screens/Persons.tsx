import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { loadPersons, loadExtendPersonData, loadExtendAbilities } from '../api';

const Item = ({ person }) => (
  <View style={styles.person}>
    <Image
      source={{
        uri: person.source.front,
      }}
      style={styles.personLogo}
    />
    <View>
      <Text style={styles.personInfo}>{person.name}</Text>
      <FlatList
        data={person.shortAbilities}
        renderItem={({item}) => (
          <View style={styles.abillityContainer}>
            <Abillities ability={item} />
          </View>
        )}
        keyExtractor={item => item.name}
      />
    </View>
  </View>
);
const Abillities = ({ ability }) => (
  <View>
    <Text>{ability.name}</Text>
  </View>
);

const Persons = ({ navigation }) => {

  let personListData: {
    id: string;
    name: string;
    shortAbilities: {
      effect: {effect: any; short_effect: any}[];
      flavor: any[];
      name: string;
    }[];
    source: {
      front: string;
      frontShiny: string;
      back: string;
      backShiny: string;
    };
  }[] = [];

  const [personData, setPersonData] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [update, setUpdate] = useState(0);
  useFocusEffect(
    React.useCallback(() => {
      setIsVisible(false);
      if (update === 0) {
        setPersonData('');
        personListData = [];
      }
      const loadPersonHendler = async () => {
        const persons = await loadPersons(
          `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${update}`,
        );
        const keys = Object.keys(persons.results);
        for (let k = 0; k < keys.length; k++) {
          const person = persons.results[k];
          const shortAbilities = [];
          const extendPersonData = await loadExtendPersonData(person.url);
          if (extendPersonData) {
            const parsedEffect: {effect: any; short_effect: any}[] = [];
            const parsedFlavor: any[] = [];
            const nodes = Object.keys(extendPersonData.abilities);
            for (let i = 0; i < nodes.length; i++) {
              const {ability} = extendPersonData.abilities[i];
              const loadedAbility = await loadExtendAbilities(ability.url);
              if (loadedAbility) {
                loadedAbility.effectEntries.forEach((item: {}) => {
                  if (item.language.name === 'en') {
                    const {effect, short_effect} = item;
                    parsedEffect.push({effect, short_effect});
                  }
                });
                loadedAbility.flavorEntries.forEach((flavor: {}) => {
                  if (flavor.language.name === 'en') {
                    parsedFlavor.push(flavor.flavor_text);
                  }
                });
              }
              const shortAbility = {
                effect: parsedEffect,
                flavor: parsedFlavor,
                name: ability.name,
              };
              shortAbilities.push(shortAbility);
            }
            const personData = {
              id: extendPersonData.id,
              name: person.name,
              shortAbilities,
              source: {
                front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extendPersonData.id}.png`,
                frontShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${extendPersonData.id}.png`,
                back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${extendPersonData.id}.png`,
                backShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${extendPersonData.id}.png`,
              },
            };
            personListData.push(personData);
          }
        }
        personData.length ? setPersonData(personData.concat(personListData)) : setPersonData(personListData);
        setIsVisible(true);
      };
      loadPersonHendler();
    }, [update]),
  );

  if (!isVisible) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
      }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const loadNextHendler = async () => {
    const newUpdate = update + 10;
    await setUpdate(newUpdate);
    console.log(update);
  };

  return (
    <View>
      <SafeAreaView style={styles.sectionContainer}>
        <FlatList onEndReached={loadNextHendler}
          data={personData}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.personItemContainer}
              onPress={() => {
                navigation.navigate('PersonDetails', {
                  id: item.id,
                  name: item.name,
                  shortAbilities: item.shortAbilities,
                  source: item.source,
                });
              }}>
              <Item person={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingTop: 15,
    marginTop: 0,
    paddingHorizontal: 0,
  },
  person: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  personLogo: {
    width: 150,
    height: 150,
  },
  personInfo: {
    width: 100,
    height: 50,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  personItemContainer: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  abillityContainer: {
    margin: 3,
    padding: 3,
    backgroundColor: '#7f7f7f',
    borderRadius: 3,
  },
});

export default Persons;
