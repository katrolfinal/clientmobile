import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Greeting({ source }) {


  return (
    <View style={source == 'home-page' ? styles.home : styles.relations}>
      <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff', }}>Welcome, Kholis</Text>
      <Text style={{fontSize: 18, color: '#fff', }}>Front-End Developer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#4A15FF', 
    height: 180, 
    borderBottomLeftRadius: 50, 
    borderBottomRightRadius: 50, 
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.1,
    shadowRadius: 9.51,
    elevation: 15
  },

  relations: {
    backgroundColor: '#4A15FF', 
    height: 180, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0, 
    padding: 35
  }
});

module.exports = Greeting;