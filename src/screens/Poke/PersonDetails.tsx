import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

import Button from '../../ui/components/Button';
import { invert } from '../../store/pokeApiSlice';
import styles from './personDetail.Style';

type RootStackParamList = {
  Persons: undefined;
  PersonDetails: {id: string};
  SimpleCam: undefined;
}

const PersonDetails: React.FC<NativeStackScreenProps<RootStackParamList, 'PersonDetails'>> = ({ navigation, route }) => {
  const personListData = useSelector(({ pokeApi }) => pokeApi.personListData);
  const dispatch = useDispatch();
  const [routes, setRoutes] = useState([{ key: '', title: '', source: ''}]);
  const [activeSlide, setactiveSlide] = useState(0);

  const isShowHideHandter = () => {
    dispatch(invert());
  };

  useEffect(() => {
      setRoutes([
        {
          key: 'front',
          title: 'Front',
          source: personData.source.front,
        },
        {
          key: 'back',
          title: 'Back',
          source: personData.source.back,
        },
        {
          key: 'frontShiny',
          title: 'Front Shiny',
          source: personData.source.frontShiny,
        },
        {
          key: 'backShiny',
          title: 'Back Shiny',
          source: personData.source.backShiny,
        },
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.params]);

  const personData = personListData.find(el => el.id === route.params.id);

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
      <View style={styles.viewTitleText}>
        <Text style={styles.titleText} >{personData.name}</Text>
      </View>
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
      <SafeAreaView style={styles.sectionContainer}>
        <Text style={styles.personInfo}>Abillity:</Text>
        <FlatList
          data={personData.shortAbilities}
          renderItem={({item, index}) => (
              <AbilityDetails shortAbility={item} ind={index} />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
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
