import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage'



export function fetchOfficeEmployee() {
  return async dispatch => {
    dispatch({ type: 'TOGGLE_LOADING', payload: true })
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        let token = JSON.parse(value).token
        // console.log(token, 'ini valuuuuue tot')
        axios({
          method: 'GET',
          url: `http://35.240.174.62/api/employees/byCompany`,
          headers: {
            token
          }
        })
          .then(({data}) => {
            dispatch({ type: 'ADD_EMPLOYEE_BY_COMPANY', payload: data })
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}

export function login() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_LOGIN', payload: true })
  }
}

export function fetchEmpoleyee(params) {
  console.log(params)
  return dispatch => {
    dispatch({ type: 'FETCH_EMPLOYEE', payload: params })
  }
}

export function addContact(params) {

  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
          let token = JSON.parse(value).token
          // console.log(token, 'ini valuuuuue tot')
          axios({
            method: 'PUT',
            url: `http://35.240.174.62/api/employees/contacts/${params.contact._id}`,
            headers: {
              token
            }
          })
            .then(() => {
              dispatch({ type: 'ADD_CONTACT', payload: params.contact })
              resolve()
            })
            .catch(err => {
              reject(err);
            })
        }
      } catch (error) {
        // Error retrieving data
      }
    })
  }
}
export function toggleModal() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_MODAL' });
  };
};

export function toggleOption() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_OPTION' });
  };
};
