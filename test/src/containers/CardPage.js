import React, { useState } from 'react';
import { View, Text, TouchableHighlight, Dimensions, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { toggleCard } from '../../stores/actions';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';

const mapStateToProps = state => ({
  card: state.card
});

const mapDispatchToProps = {
  toggleCard
};

function CardPage(props) {
  const [dummy, setDummy] = useState({
    name: 'Irsantyo Hadi',
    position: 'Full-Stack Developer',
    company: 'NFCard',
    phone: '+6281-321-216-229',
    email: 'daps@mail.com',
  })

  return (
    <ScrollView style={{backgroundColor: '#F2F1F2', height: Dimensions.get('window').height}}>
      <View style={{backgroundColor: '#374E87', height: 150, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 35}}>
        <View style={{alignItems: 'flex-end'}}>
            <TouchableHighlight onPress={() => props.toggleCard()} underlayColor='rgba(0,0,0,0.2)' style={{marginRight:-20, marginTop: -20, borderRadius:200,}}>
              <Entypo name="cross" size={30} color="#fff" style={{}}/>
            </TouchableHighlight>
          </View>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#fff', }}>
          This is {dummy.name.split(' ')[0]}'s card!
        </Text>
      </View>
      <View style={{borderRadius: 15, backgroundColor: '#DFE2C9', shadowColor: '#000',elevation: 15, margin: 30, marginTop: -55, flexDirection: 'column'}}>
        <View style={{ width: '100%', marginTop: 50}}>
          {/* IMG */}
          <View style={{alignItems: 'center'}}>
            {
              dummy.img ? 
              <Image
                style={{width: 110, height: 110, borderRadius: 200}}
                source={{uri: `${dummy.img}`}}
              /> :
              <View style={{width: 110, height: 110, borderRadius: 200, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 48, fontWeight: 'bold', color: '#FFF', marginBottom: 3}}>{dummy.name[0].toUpperCase()}</Text>
              </View>
            }
            {/* NAME & POSITION */}
            <View style={{marginTop: 15}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>{dummy.name}</Text>
              <View style={{backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 8, padding: 5, paddingLeft: 15, paddingRight: 15, marginTop: 5}}>
                <Text style={{color: '#8C80BF', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>{dummy.position}</Text>
              </View>
            </View>
          </View>
          {/* PERSONAL INFORMATION */}
          <View style={{marginTop: 80}}>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', backgroundColor: 'rgba(88, 79, 110, 0.8)', padding: 20, paddingTop: 15, paddingBottom: 15, alignItems: 'center'}}>
              <View style={{backgroundColor: '#DFE2C9', borderRadius: 200, padding: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome name='user' size={25} color='rgba(88, 79, 110, 0.8)' />
              </View>
              <View>
                <Text style={{color: '#FFF', textAlign: 'right'}}>{dummy.phone}</Text>
                <Text style={{color: '#FFF', textAlign: 'right'}}>{dummy.email}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 20, paddingTop: 15, paddingBottom: 15, alignItems: 'center'}}>
              <View style={{backgroundColor: 'rgba(88, 79, 110, 0.8)', borderRadius: 200, padding: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center'}}>
                <MaterialIcons name='location-on' size={25} color='#DFE2C9' />
              </View>
              <View>
                <Text style={{textAlign: 'right'}}>Jalan Pengen Coli 54</Text>
                <Text style={{textAlign: 'right'}}>Jakarta Tenggara</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', backgroundColor: 'rgba(88, 79, 110, 0.8)', padding: 20, paddingTop: 15, paddingBottom: 15, alignItems: 'center', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
              <View style={{backgroundColor: '#DFE2C9', borderRadius: 200, padding: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center'}}>
                <Feather name='link' size={25} color='rgba(88, 79, 110, 0.8)' />
              </View>
              <View>
                <Text style={{color: '#FFF', textAlign: 'right'}}>www.youporn.com</Text>
                <Text style={{color: '#FFF', textAlign: 'right'}}>www.pornhub.com</Text>
              </View>
            </View>

          </View>

        </View>
      </View>
    </ScrollView>
  );
};

// export default CardPage;
export default connect(mapStateToProps, mapDispatchToProps)(CardPage);