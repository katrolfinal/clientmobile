import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import React from 'react'
import NfcPage from './containers/NfcPage'
import HomePage from './containers/HomePage'
import LoginPage from './containers/LoginPage'
import AuthPage from './containers/AuthPage'
import Relations from './containers/RelationPage'

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: { header: null }
  },
  NfcPage: {
    screen: NfcPage,
    navigationOptions: { header: null }
  }
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
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        // return <Ionicons name="md-home" size={30} color={tintColor} />
      }
    }
  },
  Relations: {
    screen: RelationsNavigator,
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

const AppNavigator = createSwitchNavigator(
  {
    LoginPage: {
      screen: LoginPage,
    },
    DashboardPage: {
      screen: TabNavigator,
      navigationOptions: {
        header: null
      }
    },
    AuthPage: {
      screen: AuthPage
    }
  },
  {
    initialRouteName: 'AuthPage'
  }
)

export default createAppContainer(AppNavigator)