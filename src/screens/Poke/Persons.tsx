import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import PersonInfo from './components/PersonInfo';
import { useAppDispatch, useRootSelector } from '../../store/storeHook';
import FilterDrawer from './components/FilterDrawer';
import pokeApi from '../../api/pokeApi';

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

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: 15,
    marginTop: 0,
    paddingHorizontal: 0,
    backgroundColor: '#ffffff',
  },
  personItemContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: 'rgba(5, 0, 0, .1)',
  },
  footerList: {
    paddingBottom: 110,
  },
});

export default Persons;
