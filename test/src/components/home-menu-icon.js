import React, { useState } from 'react';
import { View, Text, TouchableHighlight, Alert, Modal, Image, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import IconFA from 'react-native-vector-icons/dist/FontAwesome5';
import IconMI from 'react-native-vector-icons/dist/MaterialIcons';
import IconMCI from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/dist/Entypo';
import { connect } from 'react-redux';
import { toggleModal, uploadImageEmployee, updateImage, fetchOfficeEmployee } from '../../stores/actions';
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker'

const mapStateToProps = state => ({
  ...state,
  dataLogin : state.dataLogin
})

const mapDispatchToProps = {
  toggleModal,
  uploadImageEmployee,
  updateImage,
  fetchOfficeEmployee
}


function MenuIcon({ icon, name, size, text, toggleModal, navigation, uploadImageEmployee, dataLogin, updateImage, fetchOfficeEmployee }) {

  _removeStorage = () => {
    
    AsyncStorage.removeItem('token')
      .then(function () {
        ToastAndroid.show(`Logout success`, ToastAndroid.SHORT)
        navigation.navigate('LoginPage')
      })
      .catch(err => {
        console.log(err);
      })
  }

  
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const uploadImage = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      // Same code as in above section!
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response, '=============');
        // setimage({ uri: response.uri });
        ToastAndroid.show(`Loading ...`, ToastAndroid.SHORT)
        uploadImageEmployee(response)
        .then(async data => {
          dataLogin.employee.image = data.image
          console.log(data, 'di menu icon')

          console.log('dataLogin: sebelum ', dataLogin, '<<<<<<<<<<<<<<<<<<<');

          await updateImage(data.image)

          // await fetchOfficeEmployee()

          await AsyncStorage.setItem('token', JSON.stringify(dataLogin))

          console.log('dataLogin: setelah', dataLogin, '>>>>>>>>>>>>>>>>>>>');

          ToastAndroid.show(`Photo Updated`, ToastAndroid.SHORT)
        })
        .catch(err=>{
          ToastAndroid.show(`failed jing`, ToastAndroid.SHORT)
        })
      }
    });
  }

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <TouchableHighlight underlayColor='rgba(0,0,0,0.2)' onPress={() => text == 'Relations' ? toggleModal() : text == 'Add' ? navigation.navigate('NfcPage') : text == 'Logout' ? _removeStorage() : text == 'Upload' ? uploadImage() : Alert.alert('HAHAHA') } style={{ justifyContent: 'center', borderRadius: 15 }}>
        <View style={{ width: 55, height: 55, backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
          {
            icon == 'FA' &&
            <IconFA name={name} size={size} color="backgroundColor: 'rgba(0, 0, 0, 0.4)'" />
          }
          {
            icon == 'MI' &&
            <IconMI name={name} size={size} color="backgroundColor: 'rgba(0, 0, 0, 0.4)'" />
          }
          {
            icon == 'MCI' &&
            <IconMCI name={name} size={size} color="backgroundColor: 'rgba(0, 0, 0, 0.4)'" />
          }
          {
            icon == 'E' &&
            <IconE name={name} size={size} color="backgroundColor: 'rgba(0, 0, 0, 0.4)'" />
          }
        </View>
      </TouchableHighlight>
      <View>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 5, fontSize: 14 }}>{text}</Text>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuIcon);