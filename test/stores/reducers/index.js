const initState = {
  isLogin : false,
  isLoading : false,
  error : null
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
    default:
      return state
  }
}