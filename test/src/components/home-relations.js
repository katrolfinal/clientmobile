import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

function Relations({ data, type, navigation }) {


  return (
    <View style={{margin: 35, marginTop: 0, marginBottom: 20}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 10, marginBottom: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>My Relations</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Relations')}>
          <Text style={{fontSize: 14, fontWeight: 'bold', paddingBottom: 1, color: '#106CFF'}}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <FlatList
          contentContainerStyle={{
            flexDirection: 'row',
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => (
            <View style={{justifyContent: 'center'}}>
              {
                item.img ? 
                <Image
                  style={{width: 50, height: 50, borderRadius: 200, marginRight: 15}}
                  source={{uri: `${item.img}`}}
                /> : 
                <View style={{width: 50, height: 50, borderRadius: 200, marginRight: 15, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 3}}>{item.name[0].toUpperCase()}</Text>
                </View>
              }
              <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14, textAlign: 'center', marginRight: 15}}>{item.name.split(' ')[0]}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

module.exports = Relations;