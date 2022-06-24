import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { setFilter } from '../../../store/poke/reduser';
import { getFilteredPokemons } from '../../../store/poke/thunk';
import Button from '../../../ui/components/button/Button';
import { useAppDispatch, useRootSelector } from '../../../store/storeHook';

const FilterDrawer = () => {

  const [right, setRight] = useState(5);
  const [pokeAbility, setPokeAbility] = useState('');
  const dispatch = useAppDispatch();
  const show = useRootSelector(({ poke })=> poke.isNoticed);
  useEffect(() => {
    show ? setRight(10) : setRight(-200);
  },[show]);
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
    <View style={[styles.drawer, {right}]}>
      <Text>Ability:</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.userData}
        placeholder="ability"
        onChangeText={newText => setPokeAbility(newText)}
        defaultValue={pokeAbility}
      />
      <View style={styles.itemContainer}>
        <Button onPress={() => applyHandler({pokeAbility})} text="apply"/>
        </View>
      <View style={styles.itemContainer} >
        <Button onPress={() => applyHandler({pokeAbility: ''})} text="clear"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: 100,
    height: 220,
    borderWidth: 1,
    borderColor: 'rgba(5, 0, 0, .1)',
    borderRadius: 10,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  userData: {
    marginTop: 10,
    marginBottom: 20,
    padding: 5,
    height: 40,
    width: 150,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    fontSize: 16,
  },
  itemContainer: {
    marginTop: 10,
    maxWidth: 80,
  }

});

export default FilterDrawer;
