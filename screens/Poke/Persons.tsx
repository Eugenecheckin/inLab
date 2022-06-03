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
import { useDispatch, useSelector } from 'react-redux';
import PersonInfo from './components/PersonInfo';
import pokeLoader from '../../store/thunk';
import FilterDrawer from './components/FilterDrawer';

type RootStackParamList = {
  Persons: undefined;
  PersonDetails: {id: string};
  RnCamera: undefined;
}
const Persons: React.FC<NativeStackScreenProps<RootStackParamList,'Persons'>> = ({ navigation }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.pokeApi.filter);
  const personListDataRedux: [] = useSelector((state) => state.pokeApi.personListData);
  interface IAbility {
    name: string;
  }
  interface IPerson {
    shortAbilities: Array<IAbility>,
  }
  const hasAbility = (person: IPerson) : boolean  => {
    const result = person.shortAbilities.find((item) => {
      item.name === filter.ability;
    });
    return !!result;
  };
  const filteredPersons = personListDataRedux.find((person) => {
    return hasAbility(person);
  });
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    dispatch(pokeLoader(+update));
    }, [update]);
    const loadNextHendler = () => {
    const newUpdate = update + 10;
    setUpdate(newUpdate);
  };
  console.log(filteredPersons);
  console.log(filter);

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
