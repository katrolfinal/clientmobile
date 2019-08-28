import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux';
import NfcManager, { Ndef } from 'react-native-nfc-manager';
import { addContact } from '../../stores/actions'
import QRscanner from '../components/qr-scanner'
import QRCode from 'react-native-qrcode-svg'
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';


function buildTextPayload(valueToWrite) {
  return Ndef.encodeMessage([Ndef.textRecord(valueToWrite)]);
}

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
      this.setState({ supported });
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
    let { employee } = this.props.dataLogin
    let { navigation } = this.props
    
    return (
      <View>
        <ScrollView style={{ backgroundColor: '#F2F1F2', height: Dimensions.get('window').height }}>
      <View style={{ backgroundColor: '#374E87', height: 150, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 30 }}>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableHighlight onPress={() => navigation.navigate('Home')} underlayColor='rgba(0,0,0,0.2)' style={{ marginRight: -20, marginTop: -20, borderRadius: 200, }}>
            <Entypo name="cross" size={30} color="#fff" style={{}} />
          </TouchableHighlight>
        </View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', }}>
          This is your card!
        </Text>
      </View>
      <View style={{ borderRadius: 15, backgroundColor: '#fff', shadowColor: '#000', elevation: 15, margin: 30, marginTop: -55, flexDirection: 'column' }}>
        <View style={{ width: '100%', marginTop: 50 }}>
          {/* IMG */}
          <View style={{ alignItems: 'center' }}>
            
            {
              employee ?
                <Image
                  style={{ width: 110, height: 110, borderRadius: 200 }}
                  source={{ uri: `${employee.image}` }}
                /> :
                <View style={{ width: 110, height: 110, borderRadius: 200, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#FFF', marginBottom: 3 }}>{employee.name[0].toUpperCase()}</Text>
                </View>
            }
            {/* NAME & POSITION */}
            <View style={{ marginTop: 15 }}>
              <View style={{ backgroundColor: 'rgba(202, 221, 250, 0.2)', borderRadius: 8, padding: 5, paddingLeft: 15, paddingRight: 15, marginTop: 5 }}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.6)', textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>{employee.name}</Text>
              </View>
              <Text style={{ color: '#5F6DA1', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>{employee.position}</Text>
              <View style={{ alignItems: 'center', marginTop: 25 }}>
                <QRCode
                  size={135}
                  value={JSON.stringify({
                    _id : employee._id,
                    name: employee.name,
                    position: employee.position,
                    image : employee.image,
                    company: {
                        name : employee.company.name,
                        color : employee.company.color
                    },
                    email: employee.email,
                    showOption: false
                  })}
                />
              </View>
            </View>
          </View>
          {/* PERSONAL INFORMATION */}
          <View style={{ marginTop: 30 }}>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', backgroundColor: employee.company.color, padding: 20, paddingTop: 8, paddingBottom: 8, alignItems: 'center' }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 200, padding: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome name='user' size={25} color={employee.company.color} />
              </View>
              <View>
                <Text style={{ color: '#FFF', textAlign: 'right' }}>0{employee.phone}</Text>
                <Text style={{ color: '#FFF', textAlign: 'right' }}>{employee.email}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 20, paddingTop: 8, paddingBottom: 8, alignItems: 'center' }}>
              <View style={{ backgroundColor: employee.company.color, borderRadius: 200, padding: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons name='location-on' size={25} color='#fff' />
              </View>
              <View>
                <Text style={{ color: 'rgba(0, 0, 0, 0.6)', textAlign: 'right' }}>{employee.address}</Text>
                {/* <Text style={{color: 'rgba(0, 0, 0, 0.6)', textAlign: 'right'}}>Jakarta Tenggara</Text> */}
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', backgroundColor: employee.company.color, padding: 20, paddingTop: 8, paddingBottom: 8, alignItems: 'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 200, padding: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome5 name='link' size={25} color={employee.company.color} />
              </View>
              <View>
                <Text style={{ color: '#FFF', textAlign: 'right' }}>www.{employee.company.name}.com</Text>
                {/* <Text style={{color: '#FFF', textAlign: 'right'}}>www.pornhub.com</Text> */}
              </View>
            </View>

          </View>
        </View>
      </View>
    </ScrollView>
      <View style={{ height: Dimensions.get('window').height, position: 'absolute', borderRadius: 15, width: '100%'}}>
        <QRscanner navigation={this.props.navigation} style={{alignItems: 'flex-end'}} />
      </View>
    </View>
    )
  }

  _requestAndroidBeam = () => {
    let { isWriting } = this.state;
    if (isWriting) {
      return;
    }
    let bytes
    let newObj = { ...this.props.dataLogin.employee }
    delete newObj.contacts
    delete newObj.password
    newObj.company = {
      name : newObj.company.name,
      color : newObj.company.color
    }
    newObj.showOption = false
    bytes = buildTextPayload(JSON.stringify(newObj));
    this.setState({ isWriting: true });
    NfcManager.setNdefPushMessage(bytes)
      .then(() => console.log('beam request completed'))
      .catch(err => console.warn(err));
  };

  _cancelAndroidBeam = () => {
    this.setState({ isWriting: false });
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
        this.setState({ supported: false });
      });

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
        });
      NfcManager.isEnabled()
        .then(enabled => {
          this.setState({ enabled });
          if (!enabled) {
            this._goToNfcSetting();
          }
        })
        .catch(err => {
          console.log(err);
        });
      NfcManager.onStateChanged(event => {
        if (event.state === 'on') {
          this.setState({ enabled: true });
        } else if (event.state === 'off') {
          this.setState({ enabled: false });
        } else if (event.state === 'turning_on') {
          // do whatever you want
        } else if (event.state === 'turning_off') {
          // do whatever you want
        }
      })
        .then(sub => {
          this._stateChangedSubscription = sub
          // remember to call this._stateChangedSubscription.remove()
          // when you don't want to listen to this anymore
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }

  _onTagDiscovered = tag => {
    this.setState({ tag });
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
              JSON.stringify(this.props.employee),
            )
            this.props.navigation.navigate('DashboardPage')
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
  }

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
