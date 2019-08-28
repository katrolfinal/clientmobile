import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import Loading from '../components/Loading'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'DashboardPage' : 'LoginPage');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        {/* <ActivityIndicator />
        <StatusBar barStyle="default" /> */}
        <Loading />
      </View>
    );
  }
}

export default AuthLoadingScreen