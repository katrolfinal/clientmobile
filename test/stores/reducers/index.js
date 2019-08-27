const initState = {
  isLogin: false,
  isLoading: false,
  error: null,
  dataLogin: {},
  modal: false,
  option: false,
  dataEmployeesByCompany: [],
  card: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'TOGGLE_LOGIN':
      return {
        ...state,
        isLogin: action.payload
      }
    case 'FETCH_EMPLOYEE':
      return {
        ...state,
        dataLogin: action.payload
      }
    case 'ADD_CONTACT':
      return {
        ...state,
        dataLogin: {
          ...state.dataLogin,
          employee: {
            ...state.dataLogin.employee,
            contacts: state.dataLogin.employee.contacts.concat([action.payload])
          }
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
    case 'ADD_EMPLOYEE_BY_COMPANY':
      return {
        ...state,
        dataEmployeesByCompany: action.payload
      }
    case 'TOGGLE_CARD':
      return {
        ...state,
        card: !state.card
      }
    default:
      return state
  }
}