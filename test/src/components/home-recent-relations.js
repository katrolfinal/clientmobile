import React from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { connect } from 'react-redux';
import { toggleCard } from '../../stores/actions';
import CardModal from '../components/card-modal';

const mapStateToProps = state => ({
  card: state.card
});

const mapDispatchToProps = {
  toggleCard
};

function RecentRelations({ data, toggleCard, navigation }) {


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
                el.image ? 
                <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.6)' onPress={() => toggleCard(el)} style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 200, marginRight: 15}}>
                  <Image
                    style={{width: 50, height: 50, borderRadius: 200}}
                    source={{uri: `${el.image}`}}
                  />
                </TouchableHighlight> : 
                <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.6)' style={{width: 50, height: 50, borderRadius: 200, marginRight: 15, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center'}} onPress={() => toggleCard(el)}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 3}}>{el.name[0].toUpperCase()}</Text>
                </TouchableHighlight>
              }
              <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14, textAlign: 'center', marginRight: 15}}>{el.name.split(' ')[0]}</Text>
            </View>
          ))
        }
        <TouchableOpacity onPress={() => navigation.navigate('NfcPage')} style={{borderRadius: 200, borderColor: 'rgba(0, 0, 0, 0.4)', borderWidth: 1, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
          <Icon name="plus" size={20} color="backgroundColor: 'rgba(0, 0, 0, 0.4)'" />
        </TouchableOpacity>
      </View>
      <CardModal navigation={navigation} />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentRelations);