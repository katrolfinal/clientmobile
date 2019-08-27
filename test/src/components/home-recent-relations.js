import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

function RecentRelations({ data }) {


  return (
    <View style={{margin: 35, marginTop: 30, marginBottom: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Recent Relations</Text>
      </View>
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        {
          data.slice(0,3).map((el, i) => (
            <View key={i}>
              { 
                el.img ? 
                <Image
                  style={{width: 50, height: 50, borderRadius: 200, marginRight: 15}}
                  source={{uri: `${el.img}`}}
                /> : 
                <View style={{width: 50, height: 50, borderRadius: 200, marginRight: 15, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 3}}>{el.name[0].toUpperCase()}</Text>
                </View>
              }
              <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14, textAlign: 'center', marginRight: 15}}>{el.name.split(' ')[0]}</Text>
            </View>
          ))
        }
        <View style={{borderRadius: 200, borderColor: 'rgba(0, 0, 0, 0.4)', borderWidth: 1, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
          <Icon name="plus" size={20} color="backgroundColor: 'rgba(0, 0, 0, 0.4)'" />
        </View>
      </View>
    </View>
  );
};

module.exports = RecentRelations;