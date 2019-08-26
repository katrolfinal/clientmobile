import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage'



export function fetchData() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_LOADING', payload: true })
    axios({
      method: 'get',
      url: ``
    })
      .then(({ data }) => {
        dispatch({ type: 'FETCH_DATA', payload: data.data.results })
        dispatch({ type: "TOGGLE_LOADING", payload: false })
      })
      .catch(err => {
        dispatch({ type: "TOGGLE_LOADING", payload: false })
        dispatch({ type: 'FETCH_ERROR', payload: err })
      })
  }
}

export function login() {
  return dispatch => {
    // axios({
    //   method: 'get',
    //   url: ``
    // })
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
  console.log(params, 'ini paraamsnya anjingggsdfsdfadasjkdashjkdashdjkashdjaksdh');
  return async dispatch => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        let token = JSON.parse(value).token
        console.log(token, 'ini valuuuuue tot')
        axios({
          method: 'PUT',
          url: `http://172.16.12.49:3000/api/employees/contacts/${params.contact._id}`,
          headers: {
            token
          }
        })

          .then(() => {
            dispatch({ type: 'ADD_CONTACT', payload: params.contact })
          })
          .catch(err => {
            console.log(err);
          })
      }
    } catch (error) {
      // Error retrieving data
    }
  }
}