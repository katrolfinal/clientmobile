import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux';
import NfcManager, { Ndef } from 'react-native-nfc-manager';
import { addContact } from '../../stores/actions'
import ButtonCall from '../components/ButtonCall'
import ButtonEmail from '../components/ButtonEmail'
import ButtonWhatsapp from '../components/ButtonWhatsApp'
import QRscanner from '../components/qr-scanner'
import QRCode from 'react-native-qrcode-svg'

function buildTextPayload(valueToWrite) {
  return Ndef.encodeMessage([Ndef.textRecord(valueToWrite)]);
}

const test = {
  name: 'jembut',
  positon: '69',
  phoneNumber: '87825478178',
  email: 'irsantyohadi@gmail.com',
};

class NfcPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supported: true,
      enabled: false,
      isWriting: false,
      tag: {},
      iniObject: {},
    };
  }

  componentDidMount() {
    NfcManager.isSupported().then(supported => {
      this.setState({supported});
      if (supported) {
        this._startNfc();
        this._startDetection();
        this._requestAndroidBeam();
      }
    });
  }

  componentWillUnmount() {
    if (this._stateChangedSubscription) {
      this._stateChangedSubscription.remove();
      this._stopDetection();
      this._cancelAndroidBeam();
    }
  }

  render() {
    let {supported, enabled} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{flex: 3 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{`Is NFC supported ? ${supported}`}</Text>
              <Text>{`Is NFC enabled (Android only)? ${enabled}`}</Text>

              <ButtonCall
                number={test.phoneNumber}
              />

              <ButtonEmail
                email={test.email}
              />

              <ButtonWhatsapp
                number={test.phoneNumber}
              />
              <View>
                <QRCode
                  value={JSON.stringify({
                    _id : this.props.dataLogin.employee._id,
                    address : this.props.dataLogin.employee.address,
                    name : this.props.dataLogin.employee.name,
                    position : this.props.dataLogin.employee.position,
                    company : this.props.dataLogin.employee.company.name,
                    email : this.props.dataLogin.employee.email,
                    showOption : false
                  })}
                />
            </View>
            <Text>{JSON.stringify(this.props.dataLogin.employee.contacts)}</Text>
            </View>
          </ScrollView>
        </View>
        <View style={{flex : 3}}>
        <QRscanner />
        </View>
      </View>
    )
  }

  _requestAndroidBeam = () => {
    let {isWriting} = this.state;
    if (isWriting) {
      return;
    }
    let bytes
    let newObj = { ...this.props.dataLogin.employee }
    delete newObj.contacts
    delete newObj.password
    newObj.company = newObj.company.name
    newObj.showOption = false
    bytes = buildTextPayload(JSON.stringify(newObj));
    this.setState({isWriting: true});
    NfcManager.setNdefPushMessage(bytes)
      .then(() => console.log('beam request completed'))
      .catch(err => console.warn(err));
  };

  _cancelAndroidBeam = () => {
    this.setState({isWriting: false});
    NfcManager.setNdefPushMessage(null)
      .then(() => console.log('beam cancelled'))
      .catch(err => console.warn(err));
  };

  _startNfc() {
    NfcManager.start({
      onSessionClosedIOS: () => {
        console.log('ios session closed');
      },
    })
      .then(result => {
        console.log('start OK', result);
      })
      .catch(error => {
        console.warn('start fail', error);
        this.setState({supported: false});
      });

    if (Platform.OS === 'android') {
      NfcManager.getLaunchTagEvent()
        .then(tag => {
          console.log('launch tag', tag);
          if (tag) {
            this.setState({tag});
          }
        })
        .catch(err => {
          console.log(err);
        });
      NfcManager.isEnabled()
        .then(enabled => {
          this.setState({enabled});
          if (!enabled) {
            this._goToNfcSetting();
          }
        })
        .catch(err => {
          console.log(err);
        });
      NfcManager.onStateChanged(event => {
        if (event.state === 'on') {
          this.setState({enabled: true});
        } else if (event.state === 'off') {
          this.setState({enabled: false});
        } else if (event.state === 'turning_on') {
          // do whatever you want
        } else if (event.state === 'turning_off') {
          // do whatever you want
        }
      })
        .then(sub => {
          this._stateChangedSubscription = sub;
          // remember to call this._stateChangedSubscription.remove()
          // when you don't want to listen to this anymore
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }

  _onTagDiscovered = tag => {
    console.log(tag, 'ini taaag asuuuuu');
    this.setState({tag});

    let parsed = null;
    if (tag.ndefMessage && tag.ndefMessage.length > 0) {
      // ndefMessage is actually an array of NdefRecords,
      // and we can iterate through each NdefRecord, decode its payload
      // according to its TNF & type
      const ndefRecords = tag.ndefMessage;

      function decodeNdefRecord(record) {
        if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
          return [Ndef.text.decodePayload(record.payload)];
        }
        return ['unknown', '---'];
      }
      parsed = ndefRecords.map(decodeNdefRecord);

      this.props
        .addContact({
          contact: JSON.parse(parsed),
        })
        .then(async () => {
          try {
            await AsyncStorage.setItem(
              'token',
              JSON.stringify(this.props.dataLogin),
            );
          } catch (error) {
            // Error retrieving data
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  _startDetection = () => {
    NfcManager.registerTagEvent(this._onTagDiscovered)
      .then(result => {
        console.log('registerTagEvent OK', result);
      })
      .catch(error => {
        console.warn('registerTagEvent fail', error);
      });
  };

  _stopDetection = () => {
    NfcManager.unregisterTagEvent()
      .then(result => {
        console.log('unregisterTagEvent OK', result);
      })
      .catch(error => {
        console.warn('unregisterTagEvent fail', error);
      });
  };

  _goToNfcSetting = () => {
    if (Platform.OS === 'android') {
      NfcManager.goToNfcSetting()
        .then(result => {
          console.log('goToNfcSetting OK', result);
        })
        .catch(error => {
          console.warn('goToNfcSetting fail', error);
        });
    }
  };
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  addContact,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NfcPage);
