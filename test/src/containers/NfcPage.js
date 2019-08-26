import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import NfcManager, { Ndef } from 'react-native-nfc-manager';
import Greeting from '../components/home-greeting';
import MenuNavigator from '../components/home-menu-navigator';
import RecetRelations from '../components/home-recent-relations';
import Relations from '../components/home-relations';
import RelationsModal from '../components/relations-modal';

function buildTextPayload(valueToWrite) {
  return Ndef.encodeMessage([
    Ndef.textRecord(valueToWrite),
  ]);
}

const test = {
  name: 'jembut',
  positon: '69'
}

class NfcPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supported: true,
      enabled: false,
      isWriting: false,
      urlToWrite: JSON.stringify(test),
      parsedText: null,
      tag: {},
      iniObject: {},
      dummy: [
        {
          img: 'https://semantic-ui.com/images/avatar2/small/mark.png',
          name: 'Mark'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/lindsay.png',
          name: 'Lindsay'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/matthew.png',
          name: 'Matthew'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/rachel.png',
          name: 'Rachel'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/mark.png',
          name: 'Mark'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/lindsay.png',
          name: 'Lindsay'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/matthew.png',
          name: 'Matthew'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/rachel.png',
          name: 'Rachel'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/mark.png',
          name: 'Mark'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/lindsay.png',
          name: 'Lindsay'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/matthew.png',
          name: 'Matthew'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/rachel.png',
          name: 'Rachel'
        }
      ]
    }
  }
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  componentDidMount() {
    if(!this.props.isLogin){
      // this.props.navigation.navigate('LoginPage')
    }

    NfcManager.isSupported()
      .then(supported => {
        this.setState({ supported });
        if (supported) {
          this._startNfc();
          this._startDetection();
          this._requestAndroidBeam();
        }
      })

  }

  componentWillUnmount() {
    if (this._stateChangedSubscription) {
      this._stateChangedSubscription.remove();
      this._stopDetection()
      this._cancelAndroidBeam()
    }
  }

  render() {
    let { supported, enabled, iniObject } = this.state;
    return (
      // <ScrollView style={{ flex: 1 }}>
      //   {Platform.OS === 'ios' && <View style={{ height: 60 }} />}

      //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //     <Text>{`Is NFC supported ? ${supported}`}</Text>
      //     <Text>{`Is NFC enabled (Android only)? ${enabled}`}</Text>

      //     {/* <TouchableOpacity style={{ marginTop: 20 }} onPress={this._goToNfcSetting}>
      //       <Text >(android) Go to NFC setting</Text>
      //     </TouchableOpacity> */}
      //     {
      //       iniObject.name && <Text>{`${JSON.stringify(iniObject)}`}</Text>
      //     }
      //   </View>
      // </ScrollView>
      <ScrollView>
        <Greeting source={'home-page'} />
        <MenuNavigator />
        <RecetRelations data={this.state.dummy} />
        <View
          style={{
            justifyContent: 'flex-end',
            height: 1,
            marginLeft: 30,
            marginRight: 30,
            shadowColor: '#000',
            elevation: 2,
            backgroundColor: '#fff'
          }}
        />
        <Relations data={this.state.dummy} navigation={this.props.navigation} />
        <RelationsModal />
      </ScrollView>
    )
  }

  _requestAndroidBeam = () => {
    let { isWriting, urlToWrite } = this.state;
    if (isWriting) {
      return;
    }
    let bytes
    
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
          this.setState({ enabled })
          if(!enabled){
            this._goToNfcSetting()
          }
        })
        .catch(err => {
          console.log(err);
        })
      NfcManager.onStateChanged(
        event => {
          if (event.state === 'on') {
            this.setState({ enabled: true });
          } else if (event.state === 'off') {
            this.setState({ enabled: false })
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
      this.setState({ iniObject: JSON.parse(parsed) })
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

const mapStateToProps = state => {
  return state
}



export default connect(mapStateToProps)(NfcPage)
