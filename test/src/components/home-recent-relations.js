import React from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { connect } from 'react-redux';
import { toggleCardRecentRelations } from '../../stores/actions';
import CardModal from '../components/card-modal-recent-relations';

const mapStateToProps = state => ({
  cardRecentRelations: state.cardRecentRelations
});

const mapDispatchToProps = {
  toggleCardRecentRelations
};

function RecentRelations({ data, toggleCardRecentRelations, navigation }) {


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
                <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.6)' onPress={() => toggleCardRecentRelations(el)} style={{justifyContent: 'center', alignItems: 'center', width: 65, height: 65, borderRadius: 200, marginRight: 10}}>
                  <Image
                    style={{width: 65, height: 65, borderRadius: 200}}
                    source={{uri: `${el.image}`}}
                  />
                </TouchableHighlight> : 
                <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.6)' style={{width: 65, height: 65, borderRadius: 200, marginRight: 10, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center'}} onPress={() => toggleCardRecentRelations(el)}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 3}}>{el.name[0].toUpperCase()}</Text>
                </TouchableHighlight>
              }
              <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14, textAlign: 'center', marginRight: 15}}>{el.name.split(' ')[0]}</Text>
            </View>
          ))
        }
        <TouchableOpacity onPress={() => navigation.navigate('NfcPage')} style={{borderRadius: 200, borderColor: 'rgba(0, 0, 0, 0.4)', borderWidth: 1, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
          <Icon name="plus" size={20} color="backgroundColor: 'rgba(0, 0, 0, 0.4)'" />
        </TouchableOpacity>
      </View>
      <CardModal navigation={navigation} />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentRelations);