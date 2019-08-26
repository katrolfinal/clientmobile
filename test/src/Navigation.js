import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import React from 'react'
import NfcPage from './containers/NfcPage'
import LoginPage from './containers/LoginPage'
import AuthPage from './containers/AuthPage'

const HomeStack = createStackNavigator({
  Home: {
    screen: NfcPage,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteName: 'Home'
  })


const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: 'Home',
      }
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) =>({
      // tabBarIcon: () =>{
      //   if (navigation.state.routeName === 'Home') {
      //     return <Ionicons name="ios-apps" size={32} color="black" />
      //   } 
      // }
    })
  }
)

const AppNavigator = createStackNavigator(
  {
    LoginPage : {
      screen : LoginPage,
      navigationOptions : {
        header : null
      }
    },
    DashboardPage : {
      screen : TabNavigator,
      navigationOptions : {
        header : null
      }
    },
    AuthPage : {
      screen : AuthPage
    }
  },
  {
    initialRouteName : 'AuthPage'
  }
)

export default createAppContainer(AppNavigator)