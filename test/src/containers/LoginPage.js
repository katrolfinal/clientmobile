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
  Dimensions,
  ScrollView
} from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux';
import { login , fetchEmpoleyee} from '../../stores/actions'
import AsyncStorage from '@react-native-community/async-storage'
import Feather from 'react-native-vector-icons/dist/Feather';

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
      console.log('masuk');
      axios.post('http://35.240.174.62/api/employees/login', {
        email: this.state.email,
        password: this.state.password
      }
      )
        .then(({ data }) => {
          console.log(data, 'ini datanya login');
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
      <ScrollView style={{backgroundColor: '#F2F1F2'}}>
        <Image 
          source={{uri: 'https://cdn.dribbble.com/users/2132441/screenshots/6691235/blue_4x.png'}}
          style={{width: Dimensions.get('window').width, height: 200, borderBottomLeftRadius: 50}}
        />
        <View style={{backgroundColor: '#0E005F'}}>
          <View style={{height: '100%', backgroundColor: '#F2F1F2', borderTopRightRadius: 50}}>
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,0,0,0.8)'}}>Login to your account!</Text>
              
              {/* FORM */}
              <View style={{marginTop: 20}}>
                <View style={styles.inputContainer}>
                  <Feather name="user" size={25} color="rgba(0,0,0, 0.6)" style={{marginLeft: 15}} />
                  <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({ email })} />
                </View>
                <View style={styles.inputContainer}>
                  <Feather name="key" size={25} color="rgba(0,0,0, 0.6)" style={{marginLeft: 15}} />
                  <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({ password })} />
                </View>
                {/* BUTTON LOGIN */}
                <View style={{alignItems: 'center'}}>
                  <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                    <Text style={styles.loginText}>Login</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    borderRadius: 15,
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
    width: 125,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
    shadowColor: '#00b5ec',
    elevation: 10
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});