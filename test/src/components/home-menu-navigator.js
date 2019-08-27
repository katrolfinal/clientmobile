import React from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import MenuIcon from '../components/home-menu-icon';

function MenuNavigator() {


  return (
    <View style={{backgroundColor: '#374E87', height: 100, marginLeft: 35, marginRight: 35, marginTop: -55, borderRadius: 15, justifyContent: 'center', shadowColor: '#374E87',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0,
    shadowRadius: 9.51,
    elevation: 20,}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 20, borderRadius: 15}}>
        <MenuIcon icon={'MI'} name={'person-add'} size={31.5} text={'Add'} />
        <MenuIcon icon={'FA'} name={'user-friends'} size={25} text={'Relations'} />
        <MenuIcon icon={'E'} name={'camera'} size={29} text={'Upload'} />
        <MenuIcon icon={'MCI'} name={'logout'} size={29} text={'Logout'} />
      </View>
    </View>
  );
};

module.exports = MenuNavigator;