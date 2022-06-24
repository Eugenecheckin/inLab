import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

import { IExtendedAbility, IEffectEntries, IFlavorEntries } from '../../../constants/types';
import styles from './abilityDatails.style';

const Flavor: React.FC<{ flavor: IFlavorEntries }> = ({ flavor }) => (
  <View>
    <Text style={styles.abilityItemText}>{`${flavor.version_group.name} ${flavor.flavor_text}`}</Text>
  </View>
);

const Effect: React.FC<{ effect: IEffectEntries }> = ({ effect }) => (
  <View>
    <Text style={styles.abilityItemText}>{effect.effect}</Text>
  </View>
);

const AbilityDetails: React.FC<{ abilities: IExtendedAbility, ind: number }> = ({ abilities, ind }) => (
  <View>
    <FlatList
      data={abilities.flavor_text_entries.filter(i => i.language.name === 'en')}
      renderItem={({ item }) => (
        <View style={styles.flavorContainer}>
          <Flavor flavor={item} />
        </View>
      )}
      listKey={`${ind.toString()}-flavor`}
      keyExtractor={item => `${item}-flavor`}
    />
    <FlatList
      data={abilities.effect_entries.filter(i => i.language.name === 'en')}
      renderItem={({ item }) => (
        <View style={styles.effectContainer}>
          <Effect effect={item} />
        </View>
      )}
      listKey={ind.toString()}
      keyExtractor={({ effect }) => `${effect}-effect`}
    />
  </View>
);

export default AbilityDetails;
