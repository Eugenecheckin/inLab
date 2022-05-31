import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

interface IFlavor {
  name: string;
}
interface IEffect {
  name: string;
  effect: string;
}

interface IAbility {
  flavor: Array<IFlavor>,
  effect: Array<IEffect>,
}

const AbilityDetails: React.FC<{ shortAbility: IAbility }> = ({ shortAbility }) => (
  <View >
    <View >
      <FlatList
        data={shortAbility.flavor}
        renderItem={({item}) => (
          <View style={styles.flavorContainer}>
            <Flavor flavor={item} />
          </View>
        )}
        keyExtractor={item => `${item}-flavor`}
      />
      <FlatList
        data={shortAbility.effect}
        renderItem={({item}) => (
          <View style={styles.effectContainer}>
            <Effect effect={item} />
          </View>
        )}
        keyExtractor={item => `${item}-effect`}
      />
    </View>
  </View>
);

const Flavor: React.FC<{ flavor: IFlavor }> = ({ flavor }) => (
  <View>
    <Text style={styles.abilityItemText}>{flavor}</Text>
  </View>
);

const Effect: React.FC<{ effect: IEffect }> = ({ effect }) => (
  <View>
    <Text style={styles.abilityItemText}>{effect.effect}</Text>
  </View>
);

const styles = StyleSheet.create({
  abilityItemText: {
    margin: 3,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Acme-Regular',
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