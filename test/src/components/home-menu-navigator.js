import React from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import MenuIcon from '../components/home-menu-icon';

function MenuNavigator({ navigation }) {


  return (
    <View style={{
      backgroundColor: '#3E00C0', height: 100, marginLeft: 35, marginRight: 35, marginTop: -55, borderRadius: 15, justifyContent: 'center', padding: 20, shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0,
      shadowRadius: 9.51,
      elevation: 15,
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <MenuIcon icon={'MI'} name={'person-add'} size={31.5} text={'Add'} navigation={navigation} />
        <MenuIcon icon={'FA'} name={'user-friends'} size={25} text={'Relations'} />
        <MenuIcon icon={'FA'} name={'user-friends'} size={25} text={'Relations'} />
        <MenuIcon icon={'MCI'} name={'logout'} size={29} text={'Logout'} navigation={navigation} />
      </View>
    </View>
  );
};

module.exports = MenuNavigator;