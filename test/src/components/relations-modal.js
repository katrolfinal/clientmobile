import React, {Component} from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import RelationsPage from '../containers/RelationPage';

const mapStateToProps = state => ({
  modal: state.modal
});

function RelationsModal(props) {
  
  
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.modal}
        onRequestClose={() => {
          props.navigation.navigate('Home')
          Alert.alert('Modal has been closed.');
        }}>
        <RelationsPage showClose={true} />
      </Modal>
    </View>
  );
};

export default connect(mapStateToProps)(RelationsModal);