const initState = {
  isLogin : false,
  isLoading : false,
  error : null,
  dataLogin : {},
  modal: false,
  option: false
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
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modal: !state.modal
      }
    case 'TOGGLE_OPTION':
      return {
        ...state,
        option: !state.option
      }
    default:
      return state
  }
}