const initState = {
  isLogin : false,
  isLoading : false,
  error : null,
  modal: false,
  option: false
}

export default (state = initState , action) => {
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