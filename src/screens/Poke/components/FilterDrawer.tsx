import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import Button from '../../../ui/components/button/Button';

import { setFilter } from '../../../store/poke/reduser';
import { getFilteredPokemons } from '../../../store/poke/thunk';
import { useAppDispatch, useRootSelector } from '../../../store/storeHook';
import styles from './filterDrawer.style';

const FilterDrawer = () => {

  const [right, setRight] = useState(5);
  const [pokeAbility, setPokeAbility] = useState('');

  const dispatch = useAppDispatch();

  const show = useRootSelector(({ poke }) => poke.isNoticed);

  useEffect(() => {
    show ? setRight(10) : setRight(-200);
  }, [show]);
  interface IAbility {
    pokeAbility: string;
  }

  const applyHandler = async (value: IAbility) => {
    try {
      await dispatch(setFilter(value.pokeAbility));
      dispatch(getFilteredPokemons());
      if (!value.pokeAbility) {
        setPokeAbility('');
      }
    } catch (err) {
      const customErr = err as Error;
      showMessage({
        message: `${customErr.message}`,
        type: 'info',
      });
    }
  };

  return (
    <View style={[styles.drawer, { right }]}>
      <Text>Ability:</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.userData}
        placeholder="ability"
        onChangeText={newText => setPokeAbility(newText)}
        defaultValue={pokeAbility}
      />
      <Button
        onPress={() => applyHandler({ pokeAbility })}
        text="apply"
        viewStyles={styles.itemContainer}
      />

      <Button
        onPress={() => applyHandler({ pokeAbility: '' })}
        text="clear"
        viewStyles={styles.itemContainer}
      />

    </View>
  );
};

export default FilterDrawer;
