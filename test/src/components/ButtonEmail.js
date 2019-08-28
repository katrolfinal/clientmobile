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
      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this._sentEmail(this.props.email)}>
        <Text> SEND EMAIL </Text>
      </TouchableOpacity>
    )
  }

  _sentEmail = (email) => {
    Linking.openURL(`mailto:${email}?subject=Ini Email Baru&body=Asik`)
  }

}

const mapStateToProps = state => {
  return state
}



export default connect(mapStateToProps)(ButtonEmail)
