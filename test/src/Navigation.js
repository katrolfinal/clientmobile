import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import React from 'react'
import NfcPage from './containers/NfcPage'
import LoginPage from './containers/LoginPage'

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


const AppNavigator = createBottomTabNavigator(
  {
    LoginPage : {
      screen : LoginPage,
      navigationOptions : {
        tabBarVisible : false
      }
    },
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

export default createAppContainer(AppNavigator)