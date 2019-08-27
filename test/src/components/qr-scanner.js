import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity, Linking, PermissionsAndroid } from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import { connect } from 'react-redux';

class QRscanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QR_Code_Value: '',
      Start_Scanner: false,
    }
  }

  render() {
    if (!this.state.Start_Scanner) {

      return (
        <View style={styles.MainContainer}>
          <Text style={styles.QR_text}>
            {this.state.QR_Code_Value ? 'Scanned QR Code: ' + this.state.QR_Code_Value : ''}
          </Text>

          {this.state.QR_Code_Value.includes("http") ?
            <TouchableOpacity
              onPress={this.openLink_in_browser}
              style={styles.button}>
              <Text style={{ color: '#FFF', fontSize: 14 }}>Open Link in default Browser</Text>
            </TouchableOpacity> : null
          }

          <TouchableOpacity
            onPress={this.open_QR_Code_Scanner}
            style={styles.button}>
            <Text style={{ color: '#FFF', fontSize: 14 }}>
              Open QR Scanner
            </Text>
          </TouchableOpacity>

        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>

        <CameraKitCameraScreen
          showFrame={false}
          scanBarcode={true}
          laserColor={'transparent'}
          frameColor={'#00C853'}
          offsetForScannerFrame={30}   //(default 30) optional, offset from left and right side of the screen
          heightForScannerFrame={400}
          colorForScannerFrame={'black'}
          onReadCode={event =>
            this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
          }
        />

      </View>
    );
  }
  openLink_in_browser = () => {
    Linking.openURL(this.state.QR_Code_Value);
  }


  onQR_Code_Scan_Done = (QR_Code) => {
    this.setState({ QR_Code_Value: QR_Code });
    this.setState({ Start_Scanner: false });
  }


  open_QR_Code_Scanner = () => {

    var that = this;

    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
              'title': 'Camera App Permission',
              'message': 'Camera App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.setState({ QR_Code_Value: '' });
            that.setState({ Start_Scanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      that.setState({ QR_Code_Value: '' });
      that.setState({ Start_Scanner: true });
    }
  }

  _open_QR_Code_Scanner = () => {

    var that = this;

    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
              'title': 'Camera App Permission',
              'message': 'Camera App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            that.setState({ QR_Code_Value: '' });
            that.setState({ Start_Scanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      that.setState({ QR_Code_Value: '' });
      that.setState({ Start_Scanner: true });
    }
  }
}
const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  QR_text: {
    color: '#000',
    fontSize: 19,
    padding: 8,
    marginTop: 12
  },
  button: {
    backgroundColor: '#2979FF',
    alignItems: 'center',
    padding: 12,
    width: 300,
    marginTop: 14
  },
})


const mapStateToProps = state => {
  return state
}


export default connect(mapStateToProps)(QRscanner)
