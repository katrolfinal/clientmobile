import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { toggleCard } from '../../stores/actions';
import CardModal from '../components/card-modal';

const mapStateToProps = state => ({
  card: state.card
});

const mapDispatchToProps = {
  toggleCard
};

function Relations({ data, type, navigation, toggleCard }) {


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
                item.image ? 
                <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.6)' onPress={() => toggleCard(item)} style={{justifyContent: 'center', alignItems: 'center', width: 65, height: 65, borderRadius: 200, marginRight: 10}}>
                  <Image
                    style={{width: 65, height: 65, borderRadius: 200}}
                    source={{uri: `${item.image}`}}
                  />
                </TouchableHighlight> : 
                <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.6)' style={{width: 65, height: 65, borderRadius: 200, marginRight: 10, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center'}} onPress={() => toggleCard(item)}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 3}}>{item.name[0].toUpperCase()}</Text>
                </TouchableHighlight>
              }
              <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14, textAlign: 'center', marginRight: 10}}>{item.name.split(' ')[0]}</Text>
            </View>
          )}
        />
      </View>
      <CardModal navigation={navigation} />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Relations);