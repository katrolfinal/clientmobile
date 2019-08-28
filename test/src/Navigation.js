import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import React from 'react'
import NfcPage from './containers/NfcPage'
import LoginPage from './containers/LoginPage'
import Home from './containers/NfcPage';
import Relations from './containers/RelationPage';
import CardPage from "./containers/CardPage";

const HomeNavigator = createStackNavigator({
  Home: { 
    screen: Home,
    navigationOptions: { header: null }
   },
  
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    title: 'Home'
  },
  headerStyle: {
    backgroundColor: 'black'
  }
});

const RelationsNavigator = createStackNavigator({
  Relations: {
    screen: Relations,
    navigationOptions: { header: null }
  },
  
}, {
  initialRouteName: 'Relations',
  defaultNavigationOptions: {
    title: 'Relations'
  },
  headerStyle: {
    backgroundColor: 'black'
  }
});

const TabNavigator = createBottomTabNavigator({
  Home: { 
    screen: LoginPage,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        // return <Ionicons name="md-home" size={30} color={tintColor} />
      }
    }
  },
  Relations: { 
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        // return <MaterialIcons name="movie" size={28} color={tintColor} />
      }
    }
  },
}, {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#FFA500',
    inactiveTintColor: 'gray',
    style: {
      paddingTop: 5,
      backgroundColor: 'white',
    },
    labelStyle: {
      fontSize: 11
    }
  },
})

const Navigation = createAppContainer(TabNavigator);

export default Navigation;