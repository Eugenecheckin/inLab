import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  abilityItemText: {
    margin: 3,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    // fontFamily: 'Acme-Regular',
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

export default styles;
