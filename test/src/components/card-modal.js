import React, {Component} from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import CardPage from '../containers/CardPage';

const mapStateToProps = state => ({
  card: state.card
});

function CardModal(props) {
  
  
  return (
    <View>
      <Modal
        animationType="slide"
        // transparent={false}
        visible={props.card}
        // visible={false}
        onRequestClose={() => {
          props.navigation.navigate('Home')
          // Alert.alert('Modal has been closed.');
        }}>
        <CardPage navigation={props.navigation} />
      </Modal>
    </View>
  );
};

export default connect(mapStateToProps)(CardModal);