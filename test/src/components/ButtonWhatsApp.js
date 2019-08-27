import React, { Component, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import { connect } from 'react-redux';

class ButtonEmail extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <TouchableOpacity style={{ marginTop: 20 }} onPress={() =>
        Linking.openURL('http://api.whatsapp.com/send?phone=62' + this.props.number)}>
        <Text> WHATSAPP </Text>
      </TouchableOpacity>
    )
  }

}

const mapStateToProps = state => {
  return state
}



export default connect(mapStateToProps)(ButtonEmail)
