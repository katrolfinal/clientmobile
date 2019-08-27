import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  AsyncStorage
} from 'react-native';

import axios from 'axios'

import { connect } from 'react-redux';

import { login , fetchEmpoleyee} from '../../stores/actions'

class LoginPage extends Component {

  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    this._retrieveData()
  }

  onClickListener = async (viewId) => {
    if (viewId === 'login') {
      axios.post('http://35.240.174.62/api/employees/login', {
        email: this.state.email,
        password: this.state.password
      }
      )
        .then(({ data }) => {
          this._storeData(data)
          this.props.login
          this.props.fetchEmpoleyee(data)
          this.props.navigation.navigate('DashboardPage')
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ email })} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password })} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

      </View>
    );
  }

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(data));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.props.navigation.navigate('DashboardPage')
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }
}


const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  login,
  fetchEmpoleyee
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});