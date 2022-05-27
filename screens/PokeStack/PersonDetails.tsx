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
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Button from '../components/Button';
import { invert } from '../../store/pokeApiSlice';

const PersonDetails = ({ navigation, route }) => {
  const personListData = useSelector(({ pokeApi }) => pokeApi.personListData);
  const dispatch = useDispatch();
  const [routes, setRoutes] = useState([]);
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
    }, [route.params]);

  const personData = personListData.find(el => el.id === route.params.id);

  const logoItem = ({item}) => {
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

  const Item = ({ shortAbility }) => (
    <View >
      <View >
        <FlatList
          data={shortAbility.flavor}
          renderItem={({item}) => (
            <View style={styles.abillityContainer}>
              <Flavor flavor={item} />
            </View>
          )}
          keyExtractor={item => item.name}
        />
        <FlatList
          data={shortAbility.effect}
          renderItem={({item}) => (
            <View style={styles.effectContainer}>
              <Effect effect={item} />
            </View>
          )}
          keyExtractor={item => item.name}
        />
      </View>
    </View>
  );

  const Flavor = ({ flavor }) => (
    <View>
      <Text>{flavor}</Text>
    </View>
  );

  const Effect = ({ effect }) => (
    <View>
      <Text>{effect.effect}</Text>
    </View>
  );
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
              <Item shortAbility={item} />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <View style={styles.backToPerson}>
        <Button navigation={navigation} navigateTo="Persons" text="Back" />
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
    fontSize: 16,
    margin: 5,
    height: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  effectContainer: {
    margin: 3,
    padding: 3,
  },
  flavorContainer: {
    margin: 3,
    padding: 3,
    backgroundColor: '#7f7f7f',
    borderRadius: 3,
  },
  abillityContainer: {
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

export default PersonDetails;
