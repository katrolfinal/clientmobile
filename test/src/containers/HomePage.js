import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Greeting from '../components/home-greeting';
import MenuNavigator from '../components/home-menu-navigator';
import RecetRelations from '../components/home-recent-relations';
import Relations from '../components/home-relations';
import RelationsModal from '../components/relations-modal';
import { fetchEmpoleyee, fetchOfficeEmployee } from '../../stores/actions'
import AsyncStorage from '@react-native-community/async-storage'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supported: true,
      enabled: false,
      isWriting: false,
      parsedText: null,
      tag: {},
      iniObject: {},
      dummy: [
        {
          img: 'https://semantic-ui.com/images/avatar2/small/mark.png',
          name: 'Mark'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/lindsay.png',
          name: 'Lindsay'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/matthew.png',
          name: 'Matthew'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/rachel.png',
          name: 'Rachel'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/mark.png',
          name: 'Mark'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/lindsay.png',
          name: 'Lindsay'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/matthew.png',
          name: 'Matthew'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/rachel.png',
          name: 'Rachel'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/mark.png',
          name: 'Mark'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/lindsay.png',
          name: 'Lindsay'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/matthew.png',
          name: 'Matthew'
        },
        {
          img: 'https://semantic-ui.com/images/avatar2/small/rachel.png',
          name: 'Rachel'
        }
      ]
    }
  }
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    this._retrieveData()
    this.props.fetchOfficeEmployee()
  }

  render() {
    return (
      <ScrollView>
        <Greeting source={'home-page'} data={this.props.dataLogin} />
        <MenuNavigator navigation={this.props.navigation} />
        <RecetRelations data={this.props.dataEmployeesByCompany} />
        <View
          style={{
            justifyContent: 'flex-end',
            height: 1,
            marginLeft: 30,
            marginRight: 30,
            shadowColor: '#000',
            elevation: 2,
            backgroundColor: '#fff'
          }}
        />
        <Relations data={this.props.dataEmployeesByCompany} navigation={this.props.navigation} />
        <RelationsModal />
      </ScrollView>
    )
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value === null) {
        this.props.navigation.navigate('LoginPage')
      } else {
        console.log(value, 'ini value')
        this.props.fetchEmpoleyee(JSON.parse(value))
      }
    } catch (error) {
      // Error retrieving data
    }
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  fetchEmpoleyee,
  fetchOfficeEmployee
}



export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
