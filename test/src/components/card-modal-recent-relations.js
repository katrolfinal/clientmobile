import React, {Component} from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import CardPage from '../containers/CardPage';

const mapStateToProps = state => ({
  cardRecentRelations: state.cardRecentRelations
});

function CardModal(props) {
  
  
  return (
    <View>
      <Modal
        animationType="slide"
        // transparent={false}
        visible={props.cardRecentRelations}
        // visible={false}
        onRequestClose={() => {
          props.navigation.navigate('Home')
          // Alert.alert('Modal has been closed.');
        }}>
        <CardPage navigation={props.navigation} source={'recent-relations'} />
      </Modal>
    </View>
  );
};

export default connect(mapStateToProps)(CardModal);