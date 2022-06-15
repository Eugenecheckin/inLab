import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { setFilter } from '../../../store/poke/reduser';
import { getFilteredPokemons } from '../../../store/poke/thunk';
import ManualButton from '../../../ui/components/ManualButton';

const FilterDrawer = () => {

  const [right, setRight] = useState(5);
  const [pokeAbility, setPokeAbility] = useState('');
  const dispatch = useDispatch();
  const show = useSelector(({ poke })=> poke.isNoticed);
  useEffect(() => {
    show ? setRight(10) : setRight(-200);
  },[show]);
  interface IAbility {
    pokeAbility: string;
  }

  const applyHendler = async (value: IAbility) => {
    try {
      await dispatch(setFilter(value.pokeAbility));
      dispatch(getFilteredPokemons());
      if (!value.pokeAbility) {
        setPokeAbility('');
      }
    } catch { console.log('babaX'); }
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
        <ManualButton callback={() => applyHendler({pokeAbility})} text="apply"/>
        </View>
      <View style={styles.itemContainer} >
        <ManualButton callback={() => applyHendler({pokeAbility: ''})} text="clear"/>
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
