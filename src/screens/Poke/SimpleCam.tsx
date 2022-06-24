import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Button from '../../ui/components/button/Button';

import styles from './simpleCam.Style';

type RootStackParamList = {
  Persons: undefined;
  PersonDetails: { id: number };
  SimpleCam: undefined;
}

class SimpleCam extends React.PureComponent<NativeStackScreenProps<RootStackParamList>> {
  constructor(props: NativeStackScreenProps<RootStackParamList>) {
    super(props);
    this.onPressButton = this.onPressButton.bind(this);
  }

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
    this.setState({ photo: data.uri });
  };

  onPressButton = () => {
    this.props.navigation.navigate('Persons');
  }

  render() {
    const { type } = this.state;
    const { photo } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          type={type}
          style={styles.preview}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.takePhoto.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>
              SNAP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.flipCamera.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>
              RolCam
            </Text>
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
          <Button
            onPress={this.onPressButton}
            text="Back"
          />
        </View>
      </View>
    );
  }
}
export default SimpleCam;
