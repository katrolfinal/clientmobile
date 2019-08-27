import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image, Dimensions, Alert, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { toggleModal, toggleCard } from '../../stores/actions';
import CardModal from '../components/card-modal';

const mapStateToProps = state => ({
  modal: state.modal,
  dataEmployeesByCompany : state.dataEmployeesByCompany,
  dataLogin : state.dataLogin,
  card: state.card
});

const mapDispatchToProps = {
  toggleModal,
  toggleCard
}

function RelationPage(props) {
  const [activeSwitch, setActiveSwitch] = useState('Office')
  

  const [dummy, setDummy] = useState(props.dataEmployeesByCompany)

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
    let data = dummy.map((el, i) => {
      if (i === index) {
        el.showOption = !el.showOption   
      }
      return el
    }) 
    setDummy(data)
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
          setDummy(dummy.filter(el => el.id !== selected.id)),
          ToastAndroid.show(`${selected.name} deleted!`, ToastAndroid.SHORT)
        ) }
      ], 
      { cancelable: false }
    );
  };
  return (
    <View>
      {/* <Text>{JSON.stringify(props.dataLogin.employee.contacts)}</Text> */}
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
      <View style={{borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -90, backgroundColor: '#F2F1F2', padding: 20, shadowColor: '#000',
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
        <ScrollView showsVerticalScrollIndicator={false} style={{height: 500}}>
          {
            dummy.map((el, i) => (
              <View style={{marginTop: 15, flexDirection: 'row', backgroundColor: '#fff', padding: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 15, shadowColor: '#000', elevation: 1}} key={i}>
                {
                  el.showOption == false &&
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
                  }
                {
                  el.showOption == false && 
                  <View style={{height: 70, justifyContent: 'center', width: '100%'}}>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                      <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                        <TouchableHighlight underlayColor='rgba(255, 255, 255, 0.4)' onPress={() => !props.showClose ? props.toggleCard() : null}>
                          <View>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{el.name}</Text>
                            <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14}}>{el.position}</Text>
                            <Text style={{color: 'rgba(0,0,0,0.4)', fontSize: 14}}>at {el.company.name}</Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                      <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', width: '40%'}}>
                        <TouchableHighlight onPress={() => clickOptionsButton(i)} underlayColor='rgba(0,0,0,0.2)' style={{borderRadius:200, padding: 5, width: '100%', alignItems: 'flex-end', marginRight: -20}}>
                          {/* <Text style={{textAlign: 'right'}}> */}
                            <Entypo name="dots-three-vertical" size={20} color="rgba(0, 0, 0, 0.6)" style={{}}/>
                          {/* </Text> */}
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                }
                {
                  el.showOption == true && 
                  <View style={{height: 70, justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingLeft: 15, width: '100%'}}>
                      <TouchableHighlight onPress={() => clickCallButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{width: 48, height: 48, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: '#208088', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome name="phone" size={26} color="rgba(255, 255, 255, 1)" style={{}}/>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => clickCallButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{width: 48, height: 48, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: '#008500', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome name="whatsapp" size={33} color="rgba(255, 255, 255, 1)" style={{}}/>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => clickEmailButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{width: 48, height: 48, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: '#F29800', justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="mail" size={27} color="rgba(255, 255, 255, 1)" style={{}}/>
                      </TouchableHighlight>
                      {
                        activeSwitch !== 'Office' &&
                        <TouchableHighlight onPress={() => clickDeleteButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{width: 48, height: 48, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: 'rgba(255, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center'}}>
                          <FontAwesome5 name="trash" size={19} color="rgba(255, 255, 255, 1)" style={{}}/>
                        </TouchableHighlight>
                      }
                      <TouchableHighlight onPress={() => clickOptionsButton(i)} underlayColor='rgba(0,0,0,0.2)' style={{borderRadius:200, padding: 5}}>
                        <Entypo name="cross" size={25} color="rgba(0, 0, 0, 0.6)" style={{}}/>
                      </TouchableHighlight>
                    </View>
                  </View>
                }
              </View>
            ))
          }
        </ScrollView>
      </View>
      <CardModal />
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
    backgroundColor: '#374E87', 
    height: 180, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0, 
    padding: 35,
    paddingTop: 10
  },

  header: {
    backgroundColor: '#374E87', 
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