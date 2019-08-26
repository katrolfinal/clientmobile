const initState = {
  isLogin : false,
  isLoading : false,
  error : null,
  dataLogin : {}
}

export default (state = initState , action) => {
  console.log('terpanggil');
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        ...state,
        isLoading : action.payload
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        error : action.payload
      }
    case 'TOGGLE_LOGIN' :
      return {
        ...state,
        isLogin : action.payload
      }
    case 'FETCH_EMPLOYEE' :
      return {
        ...state,
        dataLogin : action.payload
      }
    case 'ADD_CONTACT' : 
    return {
      ...state,
      dataLogin  : {
        ...state.dataLogin,
        contacts : contacts.push(action.payload)
      }
    }
    default:
      return state
  }
}