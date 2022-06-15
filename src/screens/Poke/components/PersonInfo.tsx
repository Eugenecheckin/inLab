import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IAbilityBase, IPokemonBase } from '../../../constants/types';


const Abillities: React.FC<{item: IAbilityBase}> = ({ item }) => (
  <View>
    <Text style={styles.abilityTitle}>{item.ability.name}</Text>
  </View>
);

const PersonInfo: React.FC<{person: IPokemonBase}> = ({ person }) => (
  <View style={styles.personItemGroup}>
    <Image
      source={{
        uri: person.sprites.front_default,
      }}
      style={styles.personLogo}
    />
    <View >
      <Text style={styles.personInfo}>{person.name}</Text>
      <FlatList
        data={person.abilities}
        renderItem={({item}) => (
          <View style={styles.abillityContainer}>
            <Abillities item={item} />
          </View>
        )}
        keyExtractor={item => item.ability.name}
      />
      <View style={styles.commentContainer}>
        <MaterialCommunityIcons name="comment-multiple-outline" color="#576270" size={25} />
        <Text style={styles.commentInfo}>{Math.floor(Math.random() * 100) + 1} Comments</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({

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
});

export default PersonInfo;

