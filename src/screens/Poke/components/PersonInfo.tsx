import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

const PersonInfo: React.FC<{person: IPerson}> = ({ person }) => (
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

