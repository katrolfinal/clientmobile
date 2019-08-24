import axios from "axios"

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
  console.log('masuk sini');
  return dispatch => {
    // axios({
    //   method: 'get',
    //   url: ``
    // })
    dispatch({ type: 'TOGGLE_LOGIN', payload: true })
  }
}