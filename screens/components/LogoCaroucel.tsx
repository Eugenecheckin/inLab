import React from 'react';
import { View, Text, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const LogoCarousel = () => {
  const logoItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
          <Text style={styles.title}>{ item.title }</Text>
      </View>
    );
  };

  return (
    <Carousel
      ref={(c) => { this._carousel = c; }}
      data={this.state.entries}
      renderItem={this.logoItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
    />
  );
};

 export default LogoCarousel;
