import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

import axios from 'axios'

import { connect } from 'react-redux';

import { login } from '../../stores/actions'

class LoginPage extends Component {

  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
    }
  }

  onClickListener = async (viewId) => {
    if (viewId === 'login') {
      console.log('masuk');
      // console.log(this.state.email);
      // const data = {
      //   email : this.state.email,
      //   password : this.state.password
      // }
      // try {
      //   const { data } = await axios({
      //     method: 'GET',
      //     url: 'http://api.themoviedb.org/3/search/movie?api_key=eaea6d02bfd01754390086b0464426ce&query=avenger'
      //   })
      // } catch (error) {
      //   console.log(error);
      // }

      // if (data) {
      //   console.log(data, 'ini dataaa');
      //   this.props.login
      //   this.props.navigation.navigate('Home')
      // }
        axios.post('http://172.16.12.49:3000/api/employees/login',{
            email : this.state.email,
            password : this.state.password
          }
        )
        .then(({data})=>{
          console.log(data, 'ini dataaa');
          this.props.login
          this.props.navigation.navigate('Home')
        })
        .catch(err =>{
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
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  login
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