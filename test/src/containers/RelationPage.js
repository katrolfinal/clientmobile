import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image, Dimensions, Alert, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
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
      company: 'NFCard',
      showOption: false,
      id: 1
    },
    {
      name: 'Jays No Limit',
      position: 'Back-End Developer',
      company: 'NFCard',
      showOption: false,
      id: 2
    },
    {
      name: 'Doel',
      position: 'Back-End Developer',
      company: 'NFCard',
      showOption: false,
      id: 3
    },
    {
      name: 'Kholis Ganteng',
      position: 'Front-End Developer',
      company: 'NFCard',
      showOption: false,
      id: 4
    },
    {
      img: 'https://semantic-ui.com/images/avatar2/small/rachel.png',
      name: 'Irsantyo Hadi',
      position: 'Full-Stack Developer',
      company: 'NFCard',
      showOption: false,
      id: 5
    },
    {
      img: 'https://semantic-ui.com/images/avatar2/small/lindsay.png',
      name: 'Jays No Limit',
      position: 'Back-End Developer',
      company: 'NFCard',
      showOption: false,
      id: 6
    },
    {
      img: 'https://semantic-ui.com/images/avatar2/small/mark.png',
      name: 'Doel',
      position: 'Back-End Developer',
      company: 'NFCard',
      showOption: false,
      id: 7
    },
    {
      img: 'https://semantic-ui.com/images/avatar2/small/matthew.png',
      name: 'Kholis Ganteng',
      position: 'Front-End Developer',
      company: 'NFCard',
      showOption: false,
      id: 8
    }
  ])

  clickOptions = (person, index) => {
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
                setDummy([]),
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

  clickOptionsButton = (index) => {
    setDummy(dummy.map((el, i) => {
      if (i == index) el.showOption = !el.showOption
      return el
    }));
  };

  clickCallButton = (selected) => {
    Alert.alert(
      `Call ${selected.name}?`,
      ``,
      [
        { text: 'CANCEL', onPress: () => console.log('Options closed') },
        { text: 'YES', onPress: () => console.log('Yes call pressed') }
      ], 
      { cancelable: false }
    );
  };

  clickEmailButton = (selected) => {
    Alert.alert(
      `Send email to ${selected.name}?`,
      ``,
      [
        { text: 'CANCEL', onPress: () => console.log('Options closed') },
        { text: 'YES', onPress: () => console.log('Yes email pressed') }
      ], 
      { cancelable: false }
    );
  };

  clickDeleteButton = (selected) => {
    Alert.alert(
      `Delete ${selected.name}?`,
      ``,
      [
        { text: 'CANCEL', onPress: () => console.log('Options closed') },
        { text: 'YES', onPress: () => console.log(
          Alert.alert(
            'Are you sure?',
            `${selected.name} will be deleted.`,
            [
              { text: 'CANCEL', onPress: () => console.log('Call pressed') },
              { text: 'YES', onPress: () => (
                setDummy(dummy.filter(el => el.id !== selected.id)),
                ToastAndroid.show(`${selected.name} deleted!`, ToastAndroid.SHORT)
              ) },
            ]
          )
        ) }
      ], 
      { cancelable: false }
    );
  };

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
      <View style={{borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -90, backgroundColor: '#F2F1F2', padding: 20, width: Dimensions.get('window').width, shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.1,
      shadowRadius: 9.51,
      elevation: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 15}}>{activeSwitch} Relations</Text>
            <Icon name="search1" size={20} color="backgroundColor: 'rgba(0, 0, 0, 0.4)'" />
          </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            dummy.map((el, i) => (
              <View style={{marginTop: 15, flexDirection: 'row', backgroundColor: '#fff', padding: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 15, shadowColor: '#000', elevation: 1}} key={i}>
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
                {
                  el.showOption == false && 
                  <View style={{height: 60, justifyContent: 'space-between', width: '100%'}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{el.name}</Text>
                        <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14}}>{el.position}</Text>
                        <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14}}>at {el.company}</Text>
                      </View>
                      <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', width: '40%'}}>
                        <TouchableHighlight onPress={() => clickOptionsButton(i)} underlayColor='rgba(0,0,0,0.2)' style={{borderRadius:200, padding: 5}}>
                          <Entypo name="dots-three-vertical" size={20} color="rgba(0, 0, 0, 1)" style={{}}/>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                }
                {
                  el.showOption == true && 
                  <View style={{height: 60, justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <TouchableHighlight onPress={() => clickCallButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{width: 55, height: 55, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: 'rgba(0, 255, 0, 0.8)', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome name="phone" size={30} color="rgba(255, 255, 255, 1)" style={{}}/>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => clickEmailButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{width: 55, height: 55, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: 'rgba(255, 255, 0, 0.8)', justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="mail" size={30} color="rgba(255, 255, 255, 1)" style={{}}/>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => clickDeleteButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{width: 55, height: 55, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: 'rgba(255, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome5 name="trash" size={24} color="rgba(255, 255, 255, 1)" style={{}}/>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => clickOptionsButton(i)} underlayColor='rgba(0,0,0,0.2)' style={{borderRadius:200, padding: 5}}>
                        <Entypo name="cross" size={25} color="rgba(0, 0, 0, 1)" style={{}}/>
                      </TouchableHighlight>
                    </View>
                  </View>
                }
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