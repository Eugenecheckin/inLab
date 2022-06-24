import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  abilityTitle: {
    color: 'white',
    alignSelf: 'center',
  },
  abillityContainer: {
    margin: 3,
    padding: 3,
    backgroundColor: '#7f7f7f',
    borderRadius: 3,
  },

  personLogo: {
    width: 150,
    height: 150,
  },
  personInfo: {
    margin: 3,
    width: 100,
    height: 40,
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },

  commentContainer: {
    margin: 3,
    paddingHorizontal: 0,
    flexDirection: 'row',
  },
  commentInfo: {
    margin: 3,
    width: 100,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },

  personItemGroup: {
    flexDirection: 'row',
  },
});

export default styles;
