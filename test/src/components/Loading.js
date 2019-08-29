import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class BasicExample extends React.Component {
  render() {
    return (
      
        <LottieView source={require('../../public//animation-w428-h428.json')} autoPlay loop />
    
    )
  }
}