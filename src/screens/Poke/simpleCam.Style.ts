import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backToPerson: {
    flex: 0.1,
    alignSelf: 'center',
  },
  previewPhoto: {
    flex: 0.3,
  },
  buttonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#c8c9cd',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  person: {
    flex: 0,
    marginTop: 3,
    marginBottom: 3,
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  textUri: {
    color: 'white',
  },
});

export default styles;
