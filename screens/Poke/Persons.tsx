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

type RootStackParamList = {
  Persons: undefined;
  PersonDetails: {id: string};
  RnCamera: undefined;
}
const Persons: React.FC<NativeStackScreenProps<RootStackParamList,'Persons'>> = ({ navigation }) => {
  const dispatch = useDispatch();
  const personListDataRedux = useSelector((state) => state.pokeApi.personListData);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    dispatch(pokeLoader(+update));
    }, [update]);
    const loadNextHendler = () => {
    const newUpdate = update + 10;
    setUpdate(newUpdate);
  };
  // console.log(personListDataRedux);

  return (
    <View>
      <SafeAreaView style={styles.screenContainer}>
        <FlatList
          onEndReached={loadNextHendler}
          data={personListDataRedux}
          ListFooterComponent={<ActivityIndicator size="large" style={styles.footerList} />}
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
    paddingTop: 5,
    paddingBottom: 70,
  },
});

export default Persons;
