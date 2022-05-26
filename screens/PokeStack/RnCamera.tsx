import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

import Button from '../components/Button';

class RnCamera extends React.PureComponent {

  state = {
    type: RNCamera.Constants.Type.back,
    photo: '',
  };

  flipCamera = () =>
    this.setState({
      type:
        this.state.type === RNCamera.Constants.Type.back
          ? RNCamera.Constants.Type.front
          : RNCamera.Constants.Type.back,
    });

  takePhoto = async () => {
    const options = {
      quality: 0.5,
      base64: true,
      width: 300,
      height: 300,
    };
    const data = await this.camera.takePictureAsync(options);
    this.setState({photo: data.uri});
  };

  render() {
    const {type} = this.state;
    const {photo} = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          type={type}
          style={styles.preview}
        />
        <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePhoto.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.flipCamera.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> RolCam </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.previewPhoto}>
          <Text style={styles.textUri}>{photo}</Text>
          <Image
            source={{
            uri: photo,
          }}
          style={styles.person}
          />
        </View>
        <View style={styles.backToPerson}>
          <Button navigation={this.props.navigation} navigateTo="Persons" text="Back" />
        </View>
      </View>
    );
  }
}

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
  topButtons: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
  },
  bottomButtons: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  flipButton: {
    flex: 1,
    marginTop: 20,
    right: 20,
    alignSelf: 'flex-end',
  },
  recordingButton: {
    marginBottom: 10,
  },
  backToPerson: {
    flex: 0.1,
    alignSelf: 'center',
  },
  previewPhoto: {
    flex: 0.3,
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
    flex:0,
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

export default RnCamera;
