import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { IExtendedAbility, IEffectEntries, IFlavorEntries } from '../../../constants/types';

const AbilityDetails: React.FC<{ abilities: IExtendedAbility, ind: number }> = ({ abilities, ind }) => (
  <View>
     <FlatList
        data={abilities.flavor_text_entries.filter(i=> i.language.name === 'en')}
        renderItem={({item}) => (
          <View style={styles.flavorContainer}>
            <Flavor flavor={item} />
          </View>
        )}
        listKey={`${ind.toString()}-flavor`}
        keyExtractor={item => `${item}-flavor`}
      />
      <FlatList
        data={abilities.effect_entries.filter(i=>i.language.name === 'en')}
        renderItem={({item}) => (
          <View style={styles.effectContainer}>
            <Effect effect={item} />
          </View>
        )}
        listKey={ind.toString()}
        keyExtractor={ ({effect}) => `${effect}-effect`}
      />
  </View>
);

const Flavor: React.FC<{ flavor: IFlavorEntries }> = ({ flavor }) => (
  <View>
    <Text style={styles.abilityItemText}>{`${flavor.version_group.name  } ${  flavor.flavor_text}`}</Text>
  </View>
);

const Effect: React.FC<{ effect: IEffectEntries }> = ({ effect }) => (
  <View>
    <Text style={styles.abilityItemText}>{effect.effect}</Text>
  </View>
);

const styles = StyleSheet.create({
  abilityItemText: {
    margin: 3,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    // fontFamily: 'Acme-Regular',
    color: '#7f7f7f',
  },
  effectContainer: {
    margin: 3,
    padding: 3,
  },
  flavorContainer: {
    margin: 3,
    padding: 3,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  inactiveDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(9, 9, 9, 0.92)',
  },
});

export default AbilityDetails;
