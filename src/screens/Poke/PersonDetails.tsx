import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AbilityDetails from './components/AbilityDetails';
import { useAppDispatch, useRootSelector } from '../../store/storeHook';
import Button from '../../ui/components/Button';
import { invert } from '../../store/poke/reduser';
import { getAbilities } from '../../store/poke/thunk';
import styles from './personDetail.Style';

type RootStackParamList = {
  Persons: undefined;
  PersonDetails: {id: string};
  SimpleCam: undefined;
}

const PersonDetails: React.FC<NativeStackScreenProps<RootStackParamList, 'PersonDetails'>> = ({ navigation, route }) => {
  const pokemons = useRootSelector(({ poke }) => poke.pokemons);
  const abilities = useRootSelector(({ poke }) => poke.extendedAbilities);
  const dispatch = useAppDispatch();
  const [routes, setRoutes] = useState([{ key: '', title: '', source: ''}]);
  const [activeSlide, setactiveSlide] = useState(0);

  const isShowHideHandter = () => {
    dispatch(invert());
  };
  const personData = pokemons.find(el => el.id === route.params.id);
  const listAbilitiesUrl = personData?.abilities.map(item => item.ability.url);
  useEffect(() => {
    if (personData) {
      setRoutes([
        {
          key: 'front',
          title: 'Front',
          source: personData?.sprites.front_default,
        },
        {
          key: 'back',
          title: 'Back',
          source: personData?.sprites.back_dafuult,
        },
        {
          key: 'frontShiny',
          title: 'Front Shiny',
          source: personData?.sprites.front_shiny,
        },
        {
          key: 'backShiny',
          title: 'Back Shiny',
          source: personData?.sprites.back_shiny,
        },
      ]);
      if (listAbilitiesUrl) {
        dispatch(getAbilities(listAbilitiesUrl));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.params]);

  interface ILogo {
    source: string;
  }
  const logoItem: React.FC<{item: ILogo}> = ({item}) => {
    return (
      <View style={styles.logoContainer}>
          <Image
            source={{
              uri: item.source,
            }}
            style={styles.person}
          />
      </View>
    );
  };



  const onPressButton = () => {
    navigation.navigate('Persons');
  };

  return (
    <View style={styles.screenContainer} >
      <View style={styles.carouselView}>
      <Carousel
        style={styles.carousel}
        data={routes}
        renderItem={logoItem}
        sliderWidth={420}
        itemWidth={240}
        onSnapToItem={(index) => setactiveSlide(index) }
      />
      </View>
      <Pagination
        dotsLength={routes.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
      {personData && <View style={styles.viewTitleText}>
        <Text style={styles.titleText} >{personData.name}</Text>
      </View>}
      <View style={styles.like}>
        <TouchableOpacity
          style={styles.buttonArrea}
          onPress={isShowHideHandter}>
          <MaterialCommunityIcons name="heart" color="#576270" size={25} />
          <Text style={styles.textLike}>
            Like!
          </Text>
        </TouchableOpacity>
      </View>
      {/* <SafeAreaView style={styles.sectionContainer}>
        <Text style={styles.personInfo}>Abillity:</Text>
        <FlatList
          data={abilities}
          renderItem={({item, index}) => (
              <AbilityDetails shortAbility={item} ind={index} />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView> */}
      <View style={styles.backToPerson}>
        <Button
          onPress={onPressButton}
          text="Back"
        />
      </View>
    </View>
  );
};

export default PersonDetails;
