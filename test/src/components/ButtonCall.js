import React, { Component, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import { connect } from 'react-redux';

class ButtonCall extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this._dialCall(this.props.number)}>
        <Text> CALL NUMBER </Text>
      </TouchableOpacity>
    )
  }

  _dialCall = (phone) => {
    let phoneNumber = `tel:0${phone}`

    Linking.openURL(phoneNumber)
  }

}

const mapStateToProps = state => {
  return state
}



export default connect(mapStateToProps)(ButtonCall)
