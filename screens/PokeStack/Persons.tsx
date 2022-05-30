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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonListData } from '../../store/pokeApiSlice';

import { loadPersons, loadExtendPersonData, loadExtendAbilities } from '../../api/pokeApi';

interface IShortAbillity {
  name: string;
}

const Abillities: React.FC<{ability: IShortAbillity}> = ({ ability }) => (
  <View>
    <Text style={styles.abilityTitle}>{ability.name}</Text>
  </View>
);
interface IPerson {
  source: { front: string,};
  name: string;
  shortAbilities: Array<IShortAbillity>;
}

const PersonItem: React.FC<{person: IPerson}> = ({ person }) => (
  <View style={styles.personItemGroup}>
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
      <View style={styles.commentContainer}>
        <MaterialCommunityIcons name="comment-multiple-outline" color="#576270" size={25} />
        <Text style={styles.commentInfo}>{Math.floor(Math.random() * 100) + 1} Comments</Text>
      </View>
    </View>
  </View>
);

type RootStackParamList = {
  Persons: undefined;
  PersonDetails: {id: string};
  RnCamera: undefined;
}
const Persons: React.FC<NativeStackScreenProps<RootStackParamList,'Persons'>> = ({ navigation }) => {
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
      // eslint-disable-next-line no-await-in-loop
      const extendPersonData = await loadExtendPersonData(person.url);
      if (extendPersonData) {
        const parsedEffect: {effect: any; short_effect: any}[] = [];
        const parsedFlavor: any[] = [];
        const nodes = Object.keys(extendPersonData.abilities);
        for (let i = 0; i < nodes.length; i++) {
          const {ability} = extendPersonData.abilities[i];
          // eslint-disable-next-line no-await-in-loop
          const loadedAbility = await loadExtendAbilities(ability.url);
          if (loadedAbility) {
            loadedAbility.effectEntries.forEach((item: {effect: any, short_effect: any, language: {name: string}}) => {
              if (item.language.name === 'en') {
                const {effect, short_effect} = item;
                parsedEffect.push({effect, short_effect});
              }
            });
            loadedAbility.flavorEntries.forEach((flavor: {language: {name: string}, flavor_text: string, version_group: {name: string}}) => {
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
      <SafeAreaView style={styles.screenContainer}>
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
                <PersonItem person={item} />
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
  screenContainer: {
    paddingTop: 15,
    marginTop: 0,
    paddingHorizontal: 0,
    backgroundColor: '#ffffff',
  },

  abilityTitle: {
    color: 'white',
    alignSelf: 'center',
  },
  abillityContainer: {
    margin: 3,
    padding: 3,
    backgroundColor: '#7f7f7f',
    borderRadius: 3,
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

  commentContainer: {
    margin: 3,
    paddingHorizontal: 0,
    flexDirection: 'row',
  },
  commentInfo: {
    margin: 3,
    width: 100,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },

  personItemGroup: {
    flexDirection: 'row',
  },
  personItemContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: 'rgba(5, 0, 0, .1)',
  },

});

export default Persons;
