import { StyleSheet } from 'react-native';

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
  },
});

export default styles;
