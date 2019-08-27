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
import NfcManager, {Ndef} from 'react-native-nfc-manager';

class NFC extends Component {
    constructor(props){
        console.log(props.detailCard)
        super(props);
        this.state = {
            supported: true,
            enabled: false,
            isWriting: false,
            data: props.detailCard,
            parsedText: null,
            tag: {},
        }
    }
    
    componentDidMount(){
        NfcManager.isSupported()
            .then(supported => {
                this.setState({ supported });
                if (supported) {
                    this._startNfc();
                    this._startDetection()
                    this._requestAndroidBeam();
                } else {
                    // hpnya ga support NFC
                }
            })
    }

    componentWillUnmount(){
        if(this.enabled){
            this._stopDetection()
        }
    }

    render(){
        if(this.state.parsedText){
            return (
                <View>
                    <Text>{JSON.stringify(this.state.parsedText)}</Text>
                </View>
            )
        } else {
            return (
                <Text>data belum ada</Text>
            )
        }
    }

    _startNfc = () => {
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
                this.setState({supported: false});
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
                        this.setState({enabled: true});
                    } else if (event.state === 'off') {
                        this.setState({enabled: false});
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
        this.setState({ tag });

        let text = this._parseText(tag);
        
        this.setState({parsedText: text});
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

    _requestAndroidBeam = () => {
        if (this.state.isWriting) {
            return;
        }
    
        let bytes = this.buildTextPayload(this.state.data);

        NfcManager.setNdefPushMessage(bytes)
            .then(() => console.log('beam request completed'))
            .catch(err => console.warn(err))
    }

    buildTextPayload = (valueToWrite) => {
        return Ndef.encodeMessage([
            Ndef.textRecord(valueToWrite),
        ]);
    }

    _parseText = (tag) => {
        try {
            if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                console.log(Ndef.text.decodePayload(tag.ndefMessage[0].payload));
                
                return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
            }
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    _stopDetection = () => {
        NfcManager.unregisterTagEvent()
            .then(result => {
                this.setState({ enabled : false })
                console.log('unregisterTagEvent OK', result)
            })
            .catch(error => {
                console.warn('unregisterTagEvent fail', error)
            })
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

export default NFC
