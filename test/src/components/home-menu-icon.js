import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, Alert, Modal, Image, ToastAndroid, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import IconFA from 'react-native-vector-icons/dist/FontAwesome5';
import IconMI from 'react-native-vector-icons/dist/MaterialIcons';
import IconMCI from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/dist/Entypo';
import { connect } from 'react-redux';
import Loading from '../components/Loading'
import { toggleModal, uploadImageEmployee, updateImage, fetchOfficeEmployee, getLoginEmployee, setLoading } from '../../stores/actions';
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker'
import Loader from '../components/Loading';

const mapStateToProps = state => ({
  ...state,
  dataLogin : state.dataLogin,
  isLoading: state.isLoading
})

const mapDispatchToProps = {
  toggleModal,
  uploadImageEmployee,
  updateImage,
  fetchOfficeEmployee,
  getLoginEmployee,
  setLoading
}


function MenuIcon({ icon, name, size, text, toggleModal, navigation, uploadImageEmployee, dataLogin, updateImage, fetchOfficeEmployee , getLoginEmployee, setLoading, isLoading}) {
  const [loader, setLoader] = useState(false)
  
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
        
        setLoading();
        uploadImageEmployee(response)
        .then(async data => {
          dataLogin.image = data.image

          console.log('dataLogin: sebelum ', dataLogin, '<<<<<<<<<<<<<<<<<<<');

          await updateImage(data.image)
          
          const dataNow = await getLoginEmployee()
          if (dataNow){
            fetchOfficeEmployee()
            setLoading();
          }
          console.log('dataLogin' , dataLogin);
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
      <TouchableHighlight underlayColor='rgba(0,0,0,0.2)' onPress={() => text == 'Relations' ? navigation.navigate('Relations') : text == 'Add' ? navigation.navigate('NfcPage') : text == 'Logout' ? _removeStorage() : text == 'Upload' ? uploadImage() : Alert.alert('HAHAHA') } style={{ justifyContent: 'center', borderRadius: 15 }}>
        {
          isLoading == false ?
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
          </View> :
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
              <Loader />
            }
          </View>
        }
      </TouchableHighlight>
      <View>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 5, fontSize: 14 }}>{text}</Text>
      </View>
    </View>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(MenuIcon);