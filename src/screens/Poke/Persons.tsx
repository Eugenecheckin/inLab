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
import { usePokeDispatch, usePokeSelector } from '../../store/pokeStoreHook';
import PersonInfo from './components/PersonInfo';
import { pokeListLoader } from '../../store/thunk';
import FilterDrawer from './components/FilterDrawer';

type RootStackParamList = {
  Persons: undefined;
  PersonDetails: {id: string};
  SimpleCam: undefined;
}
const Persons: React.FC<NativeStackScreenProps<RootStackParamList,'Persons'>> = ({ navigation }) => {
  const dispatch = usePokeDispatch();
  const personListDataRedux = usePokeSelector((state) => state.pokeApi.personListData);
  const [ofset, setOfset] = useState(0);

  useEffect(() => {
    dispatch(pokeListLoader(+ofset));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ofset]);


  const loadNextHendler = () => {
    const newUpdate = ofset + 10;
    setOfset(newUpdate);
  };

  return (
    <View>
      <SafeAreaView style={styles.screenContainer}>
        <FlatList
          contentContainerStyle={styles.footerList}
          onEndReached={loadNextHendler}
          data={personListDataRedux}
          ListFooterComponent={<ActivityIndicator size="large" />}
          renderItem={({item}) => (
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
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <FilterDrawer />
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
