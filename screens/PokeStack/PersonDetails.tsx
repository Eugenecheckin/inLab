import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, StyleSheet } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import Button from '../components/Button';
import { invert } from '../../store/pokeApiSlice';

const PersonDetails = ({ navigation, route }) => {
  const isNoticed = useSelector((state) => state.pokeApi.isNoticed);
  const personListData = useSelector((state) => state.pokeApi.personListData);
  const dispatch = useDispatch();
  // const [index, setIndex] = useState(0);
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

  const { name } = route.params;
  const personData = personListData.find(el => el.id === route.params.id);

  const logoItem = ({item, index}) => {
    return (
      <View style={styles.screenLayout}>
          <Image
            source={{
              uri: item.source,
            }}
            style={styles.person}
          />
      </View>
    );
  };

  const PokePagination = () => {
    // const { routes, activeSlide } = this.state;
    return (
    <Pagination
      dotsLength={routes.length}
      activeDotIndex={activeSlide}
      containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', flex: 1 }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
      }}
      inactiveDotStyle={{
        width: 8,
        height: 8,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(9, 9, 9, 0.92)',
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
    );
  };

  // console.log(activeSlide);
  return (
    <View style={styles.screenLayout} >
      <Carousel
        style={styles.personCarouselImage}
        data={routes}
        renderItem={logoItem}
        sliderWidth={420}
        itemWidth={190}
        onSnapToItem={(index) => setactiveSlide({ activeSlide: index }) }
      />
      <View style={{flex:1}}>
        {PokePagination}
      </View>
      <Text style={styles.titleText} >{personData.name}</Text>
      <SafeAreaView style={styles.sectionContainer}>
        <FlatList
          data={personData.shortAbilities}
          renderItem={({item}) => (
              <Item shortAbility={item} />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <View style={styles.backToPerson}>
        <TouchableOpacity
          style={styles.buttonArrea}
          onPress={isShowHideHandter}>
          <Text style={styles.text}>
            On/Off notice
          </Text>
        </TouchableOpacity>
        <Button navigation={navigation} navigateTo="Persons" text="Back" />
      </View>
    </View>
  );
};

const Item = ({ shortAbility }) => (
  <View >
    <View >
      <Text style={styles.personInfo}>Abillity:</Text>
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

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    marginTop: 35,
  },
  person: {
    flex:2,
    marginTop: 3,
    marginBottom: 3,
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  titleText: {
    flex: 0.2,
    paddingHorizontal: 3,
    paddingVertical: 3,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  personTabImage: {
    flex: 1,
  },
  personCarouselImage: {
    flex: 1,
  },
  backToPerson: {
    flex: 0.5,
    alignSelf: 'center',
  },
  buttonArrea: {
    alignItems: 'center',
    backgroundColor: '#c8c9cd',
    marginTop: 5,
    borderRadius: 50,
  },
  text: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    color: 'white',
    fontSize: 20,
  },
  sectionContainer: {
    flex:2,
    paddingTop: 5,
    marginTop: 0,
    paddingHorizontal: 0,
  },
  personInfo: {
    height: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  effectContainer: {
    margin: 3,
    padding: 3,
    backgroundColor: '#7f7f7f',
    borderRadius: 3,
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
    backgroundColor: '#7f7f7f',
    borderRadius: 3,
  },
});

export default PersonDetails;
