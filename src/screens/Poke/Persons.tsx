import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';

import PersonInfo from './components/PersonInfo';
import FilterDrawer from './components/FilterDrawer';

import { useAppDispatch, useRootSelector } from '../../store/storeHook';
import pokeApi from '../../api/pokeApi';
import styles from './persons.style';

type RootStackParamList = {
  Persons: undefined;
  PersonDetails: { id: number };
  SimpleCam: undefined;
}
const Persons: React.FC<NativeStackScreenProps<RootStackParamList, 'Persons'>> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const pokemons = useRootSelector((state) => state.poke.pokemons);
  const filteredPokemons = useRootSelector((state) => state.poke.filteredPokemons);
  const filter = useRootSelector((state) => state.poke.filter.ability);
  const [offset, setOfset] = useState(0);

  const getPokemonsList = async (nextItem: number) => {
    try {
      const persons = await pokeApi.loadPokemons({ limit: 10, offset: nextItem });
      const results = await Promise.all(persons);
      dispatch({ type: 'pokeApi/setPokemons', payload: results });
    } catch {
      showMessage({
        message: 'load error',
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    getPokemonsList(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNextHandler = () => {
    const next = offset + 10;
    setOfset(next);
    getPokemonsList(next);
  };

  return (
    <View>
      <View>
        <SafeAreaView style={styles.screenContainer}>
          {!filter ? (<FlatList
            contentContainerStyle={styles.footerList}
            onEndReached={loadNextHandler}
            data={pokemons}
            ListFooterComponent={<ActivityIndicator size="large" />}
            renderItem={({ item }) => (
              <View style={styles.personItemContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PersonDetails', {
                      id: item.id,
                    });
                  }}>
                  <PersonInfo person={item} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.name}
          />) :
            (<FlatList
              contentContainerStyle={styles.footerList}
              onEndReached={loadNextHandler}
              data={filteredPokemons}
              ListFooterComponent={<ActivityIndicator size="large" />}
              renderItem={({ item }) => (
                <View style={styles.personItemContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('PersonDetails', {
                        id: item.id,
                      });
                    }}>
                    <PersonInfo person={item} />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.name}
            />)}
        </SafeAreaView>
        <FilterDrawer />
      </View>
    </View>
  );
};

export default Persons;
