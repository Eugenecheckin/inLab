import { StyleSheet } from 'react-native';

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
    flex: 4,
    backgroundColor: 'rgba(216, 216, 216, 1)',
  },
  viewTitleText: {
    flex: 1,
  },

  titleText: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontSize:25,
    // fontFamily: 'Acme-Regular',
  },
  sectionContainer: {
    flex:5,
    paddingTop: 5,
    marginTop: 0,
    paddingHorizontal: 0,
  },
  like: {
    margin: 3,
    flex: 1,
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

  backToPerson: {
    flex: 1,
    alignSelf: 'center',
  },

  personInfo: {
    fontSize: 18,
    margin: 5,
    height: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    // fontFamily: 'Acme-Regular',
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
