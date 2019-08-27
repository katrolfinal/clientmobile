import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux';

class ButtonLogout extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this._removeStorage()}>
        <Text> LOGOUT </Text>
      </TouchableOpacity>
    )
  }
  
  _removeStorage = () => {
    AsyncStorage.removeItem('token')
      .then(() => {
        this.props.navigation.navigate('LoginPage')
      })
      .catch(err => {
        console.log(err);
      })
  }
}

const mapStateToProps = state => {
  return state
}



export default connect(mapStateToProps)(ButtonLogout)
