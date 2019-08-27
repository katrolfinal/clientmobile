import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image, Dimensions, Alert, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { toggleModal } from '../../stores/actions';

const mapStateToProps = state => ({
  modal: state.modal
});

const mapDispatchToProps = {
  toggleModal
}

function RelationPage(props) {
  const [activeSwitch, setActiveSwitch] = useState('Office')
  const [dummy, setDummy] = useState([
    {
      img: 'https://semantic-ui.com/images/avatar2/small/mark.png',
      name: 'Irsantyo Hadi',
      position: 'Full-Stack Developer',
      company: 'NFCard'
    },
    {
      name: 'Jays No Limit',
      position: 'Back-End Developer',
      company: 'NFCard'
    },
    {
      name: 'Doel',
      position: 'Back-End Developer',
      company: 'NFCard'
    },
    {
      name: 'Kholis Ganteng',
      position: 'Front-End Developer',
      company: 'NFCard'
    },
    {
      img: 'https://semantic-ui.com/images/avatar2/small/rachel.png',
      name: 'Irsantyo Hadi',
      position: 'Full-Stack Developer',
      company: 'NFCard'
    },
    {
      img: 'https://semantic-ui.com/images/avatar2/small/lindsay.png',
      name: 'Jays No Limit',
      position: 'Back-End Developer',
      company: 'NFCard'
    },
    {
      img: 'https://semantic-ui.com/images/avatar2/small/mark.png',
      name: 'Doel',
      position: 'Back-End Developer',
      company: 'NFCard'
    },
    {
      img: 'https://semantic-ui.com/images/avatar2/small/matthew.png',
      name: 'Kholis Ganteng',
      position: 'Front-End Developer',
      company: 'NFCard'
    }
  ])

  clickOptions = (person) => {
    Alert.alert(
      `${person.name}`,
      `${person.position} at ${person.company}.`,
      [
        { text: 'CANCEL', onPress: () => console.log('Options closed') },
        { text: 'CALL', onPress: () => console.log('Call pressed') },
        { text: 'DELETE', onPress: () => (
          Alert.alert(
            'Are you sure?',
            `${person.name} will be deleted.`,
            [
              { text: 'YES', onPress: () => (
                ToastAndroid.show(`${person.name} deleted!`, ToastAndroid.SHORT)
              ) },
              { text: 'CANCEL', onPress: () => console.log('Call pressed') },
            ]
          )
        ) },
      ],
      { cancelable: false }
    );
  }

  return (
    <View>
      <View style={props.showClose ? styles.showClose : styles.header}>
        {
          props.showClose &&
          <View style={{alignItems: 'flex-end'}}>
            <TouchableHighlight onPress={() => props.toggleModal()} underlayColor='rgba(0,0,0,0.2)' style={{marginRight:-20, borderRadius:200,}}>
              <Entypo name="cross" size={30} color="#fff" style={{}}/>
            </TouchableHighlight>
          </View>
        }
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableHighlight onPress={() => (setActiveSwitch('Office'), setDummy(dummy.reverse()))} underlayColor='rgba(255, 255, 255, 0.2)' style={{justifyContent: 'center', borderRadius: 50}}>
            <Text style={activeSwitch == 'Office' ? styles.active : styles.unative}>Office</Text>
          </TouchableHighlight>
          
          <TouchableHighlight onPress={() => (setActiveSwitch('Partner'), setDummy(dummy.reverse()))} underlayColor='rgba(255, 255, 255, 0.2)' style={{justifyContent: 'center', borderRadius: 50}}>
            <Text style={activeSwitch == 'Partner' ? styles.active : styles.unative}>Partner</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -90, height: 500, backgroundColor: '#FFF', padding: 30, width: Dimensions.get('window').width, shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.1,
      shadowRadius: 9.51,
      elevation: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 15}}>{activeSwitch} Relations</Text>
            <Icon name="search1" size={20} color="backgroundColor: 'rgba(0, 0, 0, 0.4)'" />
          </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingRight: 10}}>
          {
            dummy.map((el, i) => (
              <View style={{marginTop: 3, flexDirection: 'row'}} key={i}>
                <View style={{justifyContent: 'center'}}>
                  {
                    el.img ? 
                    <Image
                      style={{width: 55, height: 55, borderRadius: 200, marginRight: 15}}
                      source={{uri: `${el.img}`}}
                    /> :
                    <View style={{width: 55, height: 55, borderRadius: 200, marginRight: 15, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 30, fontWeight: 'bold', color: '#FFF', marginBottom: 3}}>{el.name[0].toUpperCase()}</Text>
                    </View>
                  }
                </View>
                <View style={{height: 65, justifyContent: 'space-between', width: '100%'}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', width: '42.5%'}}>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>{el.name}</Text>
                      <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14}}>{el.position}</Text>
                      <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14}}>at {el.company}</Text>
                    </View>
                    <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', width: '35%'}}>
                      <TouchableHighlight onPress={() => clickOptions(el)} underlayColor='rgba(0,0,0,0.2)' style={{borderRadius:200, padding: 5}}>
                        <Entypo name="dots-three-horizontal" size={20} color="rgba(0, 0, 0, 0.4)" style={{}}/>
                      </TouchableHighlight>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      borderBottomColor: 'rgba(0, 0, 0, 0.6)',
                      borderBottomWidth: 1
                    }}
                  />
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#4A15FF', 
    height: 180, 
    borderBottomLeftRadius: 50, 
    borderBottomRightRadius: 50, 
    padding: 35
  },

  showClose: {
    backgroundColor: '#4A15FF', 
    height: 180, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0, 
    padding: 35,
    paddingTop: 10
  },

  header: {
    backgroundColor: '#4A15FF', 
    height: 180, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0, 
    padding: 35,
  },

  active: {
    fontSize: 16, 
    color: '#fff', 
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    padding: 5, 
    paddingLeft: 15, 
    paddingRight: 15, 
    borderRadius: 200, 
    fontWeight: 'bold'
  },

  unative: {
    fontSize: 16, 
    color: '#fff', 
    padding: 5, 
    paddingLeft: 15, 
    paddingRight: 15, 
    borderRadius: 200, 
    fontWeight: 'bold'
  }
});

// export default RelationPage;
export default connect(mapStateToProps, mapDispatchToProps)(RelationPage);