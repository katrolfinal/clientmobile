import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, Dimensions, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { toggleCard, addContact } from '../../stores/actions';
import NfcManager, { Ndef } from 'react-native-nfc-manager';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5, { __esModule } from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import QRCode from 'react-native-qrcode-svg';

const mapStateToProps = state => ({
  card: state.card,
  dataCard: state.dataCard,
  dataLogin: state.dataLogin
});

const mapDispatchToProps = {
  toggleCard,
  addContact
};

function CardPage(props) {
  const [dummy, setDummy] = useState(props.dataCard)
  const [supported, setSupported] = useState(true)
  const [isWriting, setIsWriting] = useState(false)
  const [tag, setTag] = useState({})
  const [enabled, setEnabled] = useState(false)
  const [_stateChangedSubscription, setStateChangedSubscription] = useState(null)

  function buildTextPayload(valueToWrite) {
    return Ndef.encodeMessage([Ndef.textRecord(valueToWrite)]);
  }

  _requestAndroidBeam = () => {
    if (isWriting) {
      return;
    }
    let bytes
    let newObj = { ...props.dataCard }
    delete newObj.contacts
    delete newObj.password
    newObj.company = newObj.company.name
    newObj.showOption = false
    console.log(newObj, 'ini data yang dikirimnya coki');
    bytes = buildTextPayload(JSON.stringify(newObj))
    setIsWriting(true);
    NfcManager.setNdefPushMessage(bytes)
      .then(() => console.log('beam request completed'))
      .catch(err => console.warn(err));
  };

  _cancelAndroidBeam = () => {
    setIsWriting(false);
    NfcManager.setNdefPushMessage(null)
      .then(() => console.log('beam cancelled'))
      .catch(err => console.warn(err));
  };

  _startNfc = () => {
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
        setSupported(false);
      });

    if (Platform.OS === 'android') {
      NfcManager.getLaunchTagEvent()
        .then(tag => {
          console.log('launch tag', tag);
          if (tag) {
            setTag(tag);
          }
        })
        .catch(err => {
          console.log(err);
        });
      NfcManager.isEnabled()
        .then(enabled => {
          setEnabled(enabled);
          if (!enabled) {
            this_goToNfcSetting();
          }
        })
        .catch(err => {
          console.log(err);
        });
      NfcManager.onStateChanged(event => {
        if (event.state === 'on') {
          setEnabled(true);
        } else if (event.state === 'off') {
          setEnabled(false);
        } else if (event.state === 'turning_on') {
          // do whatever you want
        } else if (event.state === 'turning_off') {
          // do whatever you want
        }
      })
        .then(sub => {
          setStateChangedSubscription(sub)
          // remember to call this._stateChangedSubscription.remove()
          // when you don't want to listen to this anymore
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }

  _onTagDiscovered = tag => {
    setTag(tag);
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

      props
        .addContact({
          contact: JSON.parse(parsed),
        })
        .then(async () => {
          try {
            await AsyncStorage.setItem(
              'token',
              JSON.stringify(props.dataLogin),
            )
            _stopDetection();
            _cancelAndroidBeam();
            props.navigation.navigate('DashboardPage')
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
    NfcManager.registerTagEvent(_onTagDiscovered)
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
  useEffect(() => {
    NfcManager.isSupported().then(supported => {
      setSupported(supported);
      if (supported) {
        _startNfc();
        _startDetection()
        _requestAndroidBeam()
      }
    })
  }, [props.dataCard])

  closeCard = () => {
    _stateChangedSubscription.remove()
    _stopDetection();
    _cancelAndroidBeam();
    props.toggleCard()
  }
  return (
    <ScrollView style={{ backgroundColor: '#F2F1F2', height: Dimensions.get('window').height }}>
      <View style={{ backgroundColor: '#374E87', height: 150, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 30 }}>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableHighlight onPress={() => closeCard()} underlayColor='rgba(0,0,0,0.2)' style={{ marginRight: -20, marginTop: -20, borderRadius: 200, }}>
            <Entypo name="cross" size={30} color="#fff" style={{}} />
          </TouchableHighlight>
        </View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', }}>
          This is {dummy.name.split(' ')[0]}'s card!
        </Text>
      </View>
      <View style={{ borderRadius: 15, backgroundColor: '#fff', shadowColor: '#000', elevation: 15, margin: 30, marginTop: -55, flexDirection: 'column' }}>
        <View style={{ width: '100%', marginTop: 50 }}>
          {/* IMG */}
          <View style={{ alignItems: 'center' }}>
            {
              dummy.img ?
                <Image
                  style={{ width: 110, height: 110, borderRadius: 200 }}
                  source={{ uri: `${dummy.img}` }}
                /> :
                <View style={{ width: 110, height: 110, borderRadius: 200, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#FFF', marginBottom: 3 }}>{dummy.name[0].toUpperCase()}</Text>
                </View>
            }
            {/* NAME & POSITION */}
            <View style={{ marginTop: 15 }}>
              <View style={{ backgroundColor: 'rgba(202, 221, 250, 0.2)', borderRadius: 8, padding: 5, paddingLeft: 15, paddingRight: 15, marginTop: 5 }}>
                <Text style={{ color: 'rgba(0, 0, 0, 0.6)', textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>{dummy.name}</Text>
              </View>
              <Text style={{ color: '#5F6DA1', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>{dummy.position}</Text>
              <View style={{ alignItems: 'center', marginTop: 25 }}>
                <QRCode
                  size={135}
                  value={JSON.stringify({
                    name: dummy.name,
                    position: dummy.position,
                    company: dummy.company.name,
                    email: dummy.email,
                    showOption: false,
                    _id: dummy._id
                  })}
                />
              </View>
            </View>
          </View>
          {/* PERSONAL INFORMATION */}
          <View style={{ marginTop: 30 }}>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', backgroundColor: '#5F6DA1', padding: 20, paddingTop: 8, paddingBottom: 8, alignItems: 'center' }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 200, padding: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome name='user' size={25} color='#374E87' />
              </View>
              <View>
                <Text style={{ color: '#FFF', textAlign: 'right' }}>0{dummy.phone}</Text>
                <Text style={{ color: '#FFF', textAlign: 'right' }}>{dummy.email}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 20, paddingTop: 8, paddingBottom: 8, alignItems: 'center' }}>
              <View style={{ backgroundColor: '#374E87', borderRadius: 200, padding: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons name='location-on' size={25} color='#fff' />
              </View>
              <View>
                <Text style={{ color: 'rgba(0, 0, 0, 0.6)', textAlign: 'right' }}>{dummy.address}</Text>
                {/* <Text style={{color: 'rgba(0, 0, 0, 0.6)', textAlign: 'right'}}>Jakarta Tenggara</Text> */}
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', backgroundColor: '#5F6DA1', padding: 20, paddingTop: 8, paddingBottom: 8, alignItems: 'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 200, padding: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome5 name='link' size={25} color='#374E87' />
              </View>
              <View>
                <Text style={{ color: '#FFF', textAlign: 'right' }}>www.{dummy.company.name}.com</Text>
                {/* <Text style={{color: '#FFF', textAlign: 'right'}}>www.pornhub.com</Text> */}
              </View>
            </View>

          </View>

        </View>
      </View>
    </ScrollView>
  );
};

// export default CardPage;
export default connect(mapStateToProps, mapDispatchToProps)(CardPage);