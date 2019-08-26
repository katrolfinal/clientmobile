import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Greeting({ source , data }) {
  if(data.employee){
    console.log(data.employee.email, 'ini dataaaaasdasdasdasdasd')
  }

  return (
    <View style={source == 'home-page' ? styles.home : styles.relations}>
      {
        data.employee && <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff', }}>Welcome {data.employee.name}</Text>
        
      }
      {
        data.employee && <Text style={{fontSize: 18, color: '#fff', }}>{data.employee.position}</Text>
      }
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