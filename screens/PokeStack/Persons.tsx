import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonListData } from '../../store/pokeApiSlice';

import { loadPersons, loadExtendPersonData, loadExtendAbilities } from '../../api/pokeApi';

const Item = ({ person }) => (
  <View style={styles.person}>
    <Image
      source={{
        uri: person.source.front,
      }}
      style={styles.personLogo}
    />
    <View >
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
      <View style={styles.textGroupContainer}>
        <MaterialCommunityIcons name="comment-multiple-outline" color="#576270" size={25} />
        <Text style={styles.comment}>{Math.floor(Math.random() * 100) + 1} Comments</Text>
      </View>
    </View>
  </View>
);
const Abillities = ({ ability }) => (
  <View>
    <Text style={styles.abilityText}>{ability.name}</Text>
  </View>
);

const Persons = ({ navigation }) => {
  const dispatch = useDispatch();
  const personListDataRedux = useSelector((state) => state.pokeApi.personListData);
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
  const [update, setUpdate] = useState(0);

  const apiLoader = async () => {
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
                parsedFlavor.push(`${flavor.flavor_text  }  -  ${  flavor.version_group.name}`);
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
    personData.length ? setPersonData([...personData, ...personListData]) : setPersonData(personListData);
    await dispatch(setPersonListData(personListData));
  };

  useEffect(() => {
    if (update === 0) {
      setPersonData('');
      personListData = [];
    }
    apiLoader();
    }, [update]);
    const loadNextHendler = () => {
    const newUpdate = update + 10;
    setUpdate(newUpdate);
  };
  return (
    <View>
      <SafeAreaView style={styles.sectionContainer}>
        <FlatList
          onEndReached={loadNextHendler}
          data={personListDataRedux}
          renderItem={({item}) => (
            <View style={styles.personItemContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PersonDetails', {
                    id: item.id,
                  });
                }}>
                <Item person={item} />
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#ffffff',
  },
  textGroupContainer: {
    margin: 3,
    paddingHorizontal: 0,
    flexDirection: 'row',
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
    margin: 3,
    width: 100,
    height: 40,
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  comment: {
    margin: 3,
    width: 100,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  personItemContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(5, 0, 0, .1)',
  },
  abillityContainer: {
    margin: 3,
    padding: 3,
    backgroundColor: '#7f7f7f',
    borderRadius: 3,
  },
  abilityText: {
    color: 'white',
    alignSelf: 'center',
  },
});

export default Persons;
