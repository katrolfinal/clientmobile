import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView,
} from 'react-native';
import NfcManager, { Ndef } from 'react-native-nfc-manager';

function buildTextPayload(valueToWrite) {
  return Ndef.encodeMessage([
    Ndef.textRecord(valueToWrite),
  ]);
}

const test = {
  name: 'jembut',
  positon: '69'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supported: true,
      enabled: false,
      isWriting: false,
      urlToWrite: JSON.stringify(test),
      parsedText: null,
      tag: {},
      iniObject: {}
    }
  }

  componentDidMount() {
    NfcManager.isSupported()
      .then(supported => {
        this.setState({ supported });
        if (supported) {
          this._startNfc();
          this._startDetection();
        }
      })

  }

  componentWillUnmount() {
    if (this._stateChangedSubscription) {
      this._stateChangedSubscription.remove();
      this._stopDetection()
    }
  }

  render() {
    let { supported, enabled, tag, isWriting, parsedText , iniObject} = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        {Platform.OS === 'ios' && <View style={{ height: 60 }} />}

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{`Is NFC supported ? ${supported}`}</Text>
          <Text>{`Is NFC enabled (Android only)? ${enabled}`}</Text>

          <TouchableOpacity style={{ marginTop: 20 }} onPress={this._clearMessages}>
            <Text>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20 }} onPress={this._goToNfcSetting}>
            <Text >(android) Go to NFC setting</Text>
          </TouchableOpacity>

          {
            <View style={{ padding: 10, marginTop: 20, backgroundColor: '#e0e0e0' }}>
              <TouchableOpacity
                style={{ marginTop: 20, borderWidth: 1, borderColor: 'blue', padding: 10 }}
                onPress={isWriting ? this._cancelAndroidBeam : this._requestAndroidBeam}>
                <Text style={{ color: 'blue' }}>{`${isWriting ? 'Cancel ' : ''}Android Beam`}</Text>
              </TouchableOpacity>
            </View>
          }

          <Text style={{ marginTop: 20 }}>{`Current tag JSON: ${JSON.stringify(tag)}`}</Text>
          {parsedText && <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 18 }}>{`Parsed Text: ${parsedText}`}</Text>}
          <Text>{`${JSON.stringify(iniObject)}`}</Text>
        </View>
      </ScrollView>
    )
  }

  _requestAndroidBeam = () => {
    let { isWriting, urlToWrite } = this.state;
    if (isWriting) {
      return;
    }

    let bytes;
    bytes = buildTextPayload(urlToWrite);


    this.setState({ isWriting: true });
    NfcManager.setNdefPushMessage(bytes)
      .then(() => console.log('beam request completed'))
      .catch(err => console.warn(err))
  }

  _cancelAndroidBeam = () => {
    this.setState({ isWriting: false });
    NfcManager.setNdefPushMessage(null)
      .then(() => console.log('beam cancelled'))
      .catch(err => console.warn(err))
  }

  _startNfc() {
    NfcManager.start({
      onSessionClosedIOS: () => {
        console.log('ios session closed');
      }
    })
      .then(result => {
        console.log('start OK', result);
      })
      .catch(error => {
        console.warn('start fail', error);
        this.setState({ supported: false });
      })

    if (Platform.OS === 'android') {
      NfcManager.getLaunchTagEvent()
        .then(tag => {
          console.log('launch tag', tag);
          if (tag) {
            this.setState({ tag });
          }
        })
        .catch(err => {
          console.log(err);
        })
      NfcManager.isEnabled()
        .then(enabled => {
          this.setState({ enabled });
        })
        .catch(err => {
          console.log(err);
        })
      NfcManager.onStateChanged(
        event => {
          if (event.state === 'on') {
            this.setState({ enabled: true });
          } else if (event.state === 'off') {
            this.setState({ enabled: false });
          } else if (event.state === 'turning_on') {
            // do whatever you want
          } else if (event.state === 'turning_off') {
            // do whatever you want
          }
        }
      )
        .then(sub => {
          this._stateChangedSubscription = sub;
          // remember to call this._stateChangedSubscription.remove()
          // when you don't want to listen to this anymore
        })
        .catch(err => {
          console.warn(err);
        })
    }
  }

  _onTagDiscovered = tag => {
    console.log('Tag Discovered', tag);
    this.setState({ tag })

    let parsed = null;
    if (tag.ndefMessage && tag.ndefMessage.length > 0) {
      // ndefMessage is actually an array of NdefRecords, 
      // and we can iterate through each NdefRecord, decode its payload 
      // according to its TNF & type
      const ndefRecords = tag.ndefMessage;

      function decodeNdefRecord(record) {
        console.log('ini record', record)
        if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
          return [Ndef.text.decodePayload(record.payload)];
        }
        return ['unknown', '---']
      }
      parsed = ndefRecords.map(decodeNdefRecord)
      this.setState({iniObject : JSON.parse(parsed)})
    }
    this.setState({ parsedText: parsed })
  }

  _startDetection = () => {
    NfcManager.registerTagEvent(this._onTagDiscovered)
      .then(result => {
        console.log('registerTagEvent OK', result)
      })
      .catch(error => {
        console.warn('registerTagEvent fail', error)
      })
  }

  _stopDetection = () => {
    NfcManager.unregisterTagEvent()
      .then(result => {
        console.log('unregisterTagEvent OK', result)
      })
      .catch(error => {
        console.warn('unregisterTagEvent fail', error)
      })
  }

  _clearMessages = () => {
    this.setState({ tag: null });
  }

  _goToNfcSetting = () => {
    if (Platform.OS === 'android') {
      NfcManager.goToNfcSetting()
        .then(result => {
          console.log('goToNfcSetting OK', result)
        })
        .catch(error => {
          console.warn('goToNfcSetting fail', error)
        })
    }
  }

}

export default App;