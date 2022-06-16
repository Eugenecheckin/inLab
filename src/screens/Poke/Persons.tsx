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
import { getPokemons } from '../../store/poke/thunk';
import FilterDrawer from './components/FilterDrawer';

type RootStackParamList = {
  Persons: undefined;
  PersonDetails: {id: number};
  SimpleCam: undefined;
}
const Persons: React.FC<NativeStackScreenProps<RootStackParamList,'Persons'>> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const pokemons = useRootSelector((state) => state.poke.pokemons);
  const filteredPokemons = useRootSelector((state) => state.poke.filteredPokemons);
  const filter = useRootSelector((state) => state.poke.filter.ability);
  const [offset, setOfset] = useState(0);

  useEffect(() => {
    dispatch(getPokemons(+offset)).unwrap().catch((err) => {
      const customErr = err as Error;
      showMessage({
        message: `${customErr.message}/${customErr.stack}`,
        type: 'info',
      });
    });
    return () => console.log('размонтировался');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const loadNextHendler = () => {
    const nextOffset = offset + 10;
    setOfset(nextOffset);
  };
  console.log(!filter);
  
  return (
    <View>
      <View>
        <SafeAreaView style={styles.screenContainer}>
          {!filter ? (<FlatList
            contentContainerStyle={styles.footerList}
            onEndReached={loadNextHendler}
            data={pokemons}
            ListFooterComponent={<ActivityIndicator size="large" />}
            renderItem={({item}) => (
              <View style={styles.personItemContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PersonDetails', {
                      id: item.id,
                    });
                  }}>
                  <PersonInfo person={item}/>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.name}
          />) :
          (<FlatList
            contentContainerStyle={styles.footerList}
            onEndReached={loadNextHendler}
            data={filteredPokemons}
            ListFooterComponent={<ActivityIndicator size="large" />}
            renderItem={({item}) => (
              <View style={styles.personItemContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PersonDetails', {
                      id: item.id,
                    });
                  }}>
                  <PersonInfo person={item}/>
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
