import React, { useState } from 'react';
import { View, Text, TouchableHighlight, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import IconFA from 'react-native-vector-icons/dist/FontAwesome5';
import IconMI from 'react-native-vector-icons/dist/MaterialIcons';
import IconMCI from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/dist/Entypo';
import { connect } from 'react-redux';
import { toggleModal } from '../../stores/actions';

const mapDispatchToProps = {
  toggleModal
}

function MenuIcon({ icon, name, size, text , toggleModal}) {

  return (
    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
      <TouchableHighlight underlayColor='rgba(0,0,0,0.2)' onPress={() => text == 'Relations' ? toggleModal() : Alert.alert('HAHAHA')} style={{justifyContent: 'center', borderRadius: 15}}>
        <View style={{width: 55, height: 55, backgroundColor: '#fff', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
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
        <Text style={{color: '#fff', textAlign: 'center', marginTop: 5, fontSize: 14}}>{text}</Text>
      </View>
    </View>
  );
};

export default connect(null, mapDispatchToProps)(MenuIcon);