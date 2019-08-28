import React, { useState ,useEffect } from 'react';
import { View, Text, Linking, StyleSheet, RefreshControl, TouchableHighlight, ScrollView, Image, Dimensions, Alert, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { toggleModal, toggleCard, deleteContact, updateContacts ,fetchOfficeEmployee , getLoginEmployee} from '../../stores/actions';
import CardModal from '../components/card-modal';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const mapStateToProps = state => ({
  modal: state.modal,
  dataEmployeesByCompany: state.dataEmployeesByCompany,
  dataLogin: state.dataLogin,
  card: state.card
});

const mapDispatchToProps = {
  toggleModal,
  toggleCard,
  deleteContact,
  updateContacts,
  fetchOfficeEmployee,
  getLoginEmployee
}

function RelationPage(props) {
  const [activeSwitch, setActiveSwitch] = useState('Office')
  const [dummy, setDummy] = useState(props.dataEmployeesByCompany)
  const [refreshing, setRefreshing] = useState(false)
  
  useEffect(()=>{
    if(!refreshing) {
      if(activeSwitch == 'Office'){
        setDummy(props.dataEmployeesByCompany)
      }else{
        setDummy(props.dataLogin.contacts)
      }
    }
  },[refreshing])

  _onRefresh = async () => {
    if(activeSwitch === 'Office'){
      setRefreshing(true)
      setDummy([])
      await props.fetchOfficeEmployee()
      setTimeout(() => {
        // setDummy(props.dataEmployeesByCompany)
        setRefreshing(false)
      }, 2000)
    }else{
      setRefreshing(true)
      setDummy([])
     const data =  await props.getLoginEmployee()
      if(data){
        setRefreshing(false)
      }
    }
  }

  clickOptions = (person, index) => {
    Alert.alert(
      `${person.name}`,
      `${person.position} at ${person.company}.`,
      [
        { text: 'CANCEL', onPress: () => console.log('Options closed') },
        { text: 'CALL', onPress: () => console.log('Call pressed') },
        {
          text: 'DELETE', onPress: () => (
            Alert.alert(
              'Are you sure?',
              `${person.name} will be deleted.`,
              [
                {
                  text: 'YES', onPress: () => (
                    setDummy([]),
                    ToastAndroid.show(`${person.name} deleted!`, ToastAndroid.SHORT)
                  )
                },
                { text: 'CANCEL', onPress: () => console.log('Call pressed') },
              ]
            )
          )
        },
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
        {
          text: 'YES', onPress: () => {
            let phoneNumber = `tel:0${selected.phone}`
            Linking.openURL(phoneNumber)
          }
        }
      ],
      { cancelable: false }
    );
  };

  clickWAButton = (selected) => {
    Alert.alert(
      `whatsapp ${selected.name}?`,
      ``,
      [
        { text: 'CANCEL', onPress: () => console.log('Options closed') },
        {
          text: 'YES', onPress: () => {
            Linking.openURL('http://api.whatsapp.com/send?phone=62' + selected.phone)
          }
        }
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
        {
          text: 'YES', onPress: () => {
            Linking.openURL(`mailto:${selected.email}`)
          }
        }
      ],
      { cancelable: false }
    );
  };

  clickDeleteButton = (selected) => {
    selected.showOption = false
    Alert.alert(
      `Delete ${selected.name}?`,
      ``,
      [
        { text: 'CANCEL', onPress: () => console.log('Options closed') },
        {
          text: 'YES', onPress: () => {
            setRefreshing(true)
            setDummy([])
            props.deleteContact(selected._id)
              .then(async () => {
                const data = await props.getLoginEmployee()
                if(data){
                  setRefreshing(false)
                }
              })
              .catch(err => {
                console.log(err);
              })
          }
        }
      ],
      { cancelable: false }
    );
  };
  return (
    <View>
      <View style={props.showClose ? styles.showClose : styles.header}>
        {
          props.showClose &&
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableHighlight onPress={() => props.toggleModal()} underlayColor='rgba(0,0,0,0.2)' style={{ marginRight: -20, borderRadius: 200, }}>
              <Entypo name="cross" size={30} color="#fff" style={{}} />
            </TouchableHighlight>
          </View>
        }
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableHighlight onPress={() => (setActiveSwitch('Office'), setDummy(props.dataEmployeesByCompany))} underlayColor='rgba(255, 255, 255, 0.2)' style={{ justifyContent: 'center', borderRadius: 50 }}>
            <Text style={activeSwitch == 'Office' ? styles.active : styles.unative}>Office</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => (setActiveSwitch('Partner'), setDummy(props.dataLogin.contacts))} underlayColor='rgba(255, 255, 255, 0.2)' style={{ justifyContent: 'center', borderRadius: 50 }}>
            <Text style={activeSwitch == 'Partner' ? styles.active : styles.unative}>Partner</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{
        borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -90, backgroundColor: '#F2F1F2', padding: 20, shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.1,
        shadowRadius: 9.51,
        elevation: 15
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>{activeSwitch} Relations</Text>
          <Icon name="search1" size={20} color="backgroundColor: 'rgba(0, 0, 0, 0.4)'" />
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing}
            onRefresh={_onRefresh}/>} showsVerticalScrollIndicator={false} style={{ height: Dimensions.get('window').height }}>
          {

            dummy.map((el, i) => (
              <View style={{ marginTop: 15, flexDirection: 'row', backgroundColor: '#fff', padding: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 15, shadowColor: '#000', elevation: 1 }} key={i}>
                {
                  el.showOption == false &&
                  <View style={{ justifyContent: 'center' }}>
                    {
                      el.image ?
                        <Image
                          style={{ width: 75, height: 75, borderRadius: 200, marginRight: 15 }}
                          source={{ uri: `${el.image}` }}
                        /> :
                        <View style={{ width: 75, height: 75, borderRadius: 200, marginRight: 15, backgroundColor: 'rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FFF', marginBottom: 3 }}>{el.name[0].toUpperCase()}</Text>
                        </View>
                    }
                  </View>
                }
                {
                  el.showOption == false &&
                  <View style={{ height: 75, justifyContent: 'center', width: '100%' }}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <TouchableHighlight underlayColor='rgba(255, 255, 255, 0.4)' onPress={() => !props.showClose ? props.toggleCard(el) : null} style={{ minWidth: 200 }}>
                          <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{el.name}</Text>
                            <Text style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>{el.position}</Text>
                            {
                              activeSwitch === 'Office' ?
                                <Text style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>at {el.company.name}</Text> :
                                <Text style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>at {el.company.name}</Text>
                            }
                          </View>
                        </TouchableHighlight>
                      </View>
                      <View style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', width: '10%' }}>
                        <TouchableHighlight onPress={() => clickOptionsButton(i)} underlayColor='rgba(0,0,0,0.2)' style={{ borderRadius: 200, padding: 5, width: '100%', alignItems: 'flex-end', marginRight: -20 }}>
                          {/* <Text style={{textAlign: 'right'}}> */}
                          <Entypo name="dots-three-vertical" size={20} color="rgba(0, 0, 0, 0.6)" style={{}} />
                          {/* </Text> */}
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                }
                {
                  el.showOption == true &&
                  <View style={{ height: 75, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingLeft: 15, width: '100%' }}>
                      <TouchableHighlight onPress={() => clickCallButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{ width: 48, height: 48, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: '#208088', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome name="phone" size={26} color="rgba(255, 255, 255, 1)" style={{}} />
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => clickWAButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{ width: 48, height: 48, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: '#008500', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome name="whatsapp" size={33} color="rgba(255, 255, 255, 1)" style={{}} />
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => clickEmailButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{ width: 48, height: 48, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: '#F29800', justifyContent: 'center', alignItems: 'center' }}>
                        <Entypo name="mail" size={27} color="rgba(255, 255, 255, 1)" style={{}} />
                      </TouchableHighlight>
                      {
                        activeSwitch === 'Partner' &&
                        <TouchableHighlight onPress={() => clickDeleteButton(el)} underlayColor='rgba(0,0,0,0.2)' style={{ width: 48, height: 48, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: 'rgba(255, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
                          <FontAwesome5 name="trash" size={19} color="rgba(255, 255, 255, 1)" style={{}} />
                        </TouchableHighlight>
                      }
                      {
                        activeSwitch === 'Office' &&
                        <TouchableHighlight onPress={() => Alert.alert('Soon')} underlayColor='rgba(0,0,0,0.2)' style={{ width: 48, height: 48, borderRadius: 200, marginRight: 15, padding: 5, backgroundColor: 'rgba(255, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
                          <Feather name="share-2" size={19} color="rgba(255, 255, 255, 1)" style={{}} />
                        </TouchableHighlight>
                      }
                      <TouchableHighlight onPress={() => clickOptionsButton(i)} underlayColor='rgba(0,0,0,0.2)' style={{ borderRadius: 200, padding: 5 }}>
                        <Entypo name="cross" size={25} color="rgba(0, 0, 0, 0.6)" style={{}} />
                      </TouchableHighlight>
                    </View>
                  </View>
                }
              </View>
            ))
          }
          <View style={{ height: 250 }}></View>
        </ScrollView>
      </View>
      <CardModal navigation={props.navigation} />
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