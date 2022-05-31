import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AbilityDetails from './components/AbilityDetails';

import Button from '../../ui/components/Button';
import { invert } from '../../store/pokeApiSlice';

type RootStackParamList = {
  Persons: undefined;
  PersonDetails: {id: string};
  RnCamera: undefined;
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
  console.log(personData);

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
          renderItem={({item}) => (
              <AbilityDetails shortAbility={item} />
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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    marginTop: 35,
    flex: 1,
  },
  carousel: {
    flex: 1,
  },
  carouselView: {
    flex: 1,
    backgroundColor: 'rgba(216, 216, 216, 1)',
  },
  viewTitleText: {
    flex: 0.3,
  },

  titleText: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontSize:25,
    fontFamily: 'Acme-Regular',
  },
  sectionContainer: {
    flex:2,
    paddingTop: 5,
    marginTop: 0,
    paddingHorizontal: 0,
  },
  like: {
    margin: 3,
    flex: 0.3,
    alignSelf: 'flex-start',
  },
  buttonArrea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 0, 0, .1)',
    marginTop: 5,
    marginLeft:2,
    borderRadius: 5,
  },
  textLike: {
    paddingHorizontal: 3,
    paddingVertical: 5,
    color: 'white',
    fontSize: 20,
  },

  person: {
    flex:1,
    marginTop: 3,
    marginBottom: 3,
    width: 150,
    height: 150,
    alignSelf: 'center',
  },

  personTabImage: {
    flex: 1,
  },

  backToPerson: {
    flex: 0.5,
    alignSelf: 'center',
  },

  personInfo: {
    fontSize: 18,
    margin: 5,
    height: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Acme-Regular',
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

export default PersonDetails;
