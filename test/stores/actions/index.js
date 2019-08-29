import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export function getLoginEmployee() {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
          let storage = JSON.parse(value)
          const { data } = await axios({
            method: 'get',
            url: `http://35.240.174.62/api/employees/byId/${storage._id}`,
            headers: {
              token: storage.token
            }
          })
          data.contacts.forEach(el => {
            el.showOption = false;
          });
          await dispatch({ type: 'FETCH_EMPLOYEE', payload: data })
          resolve(data)
        }
      } catch (error) {
        reject(error)
        console.log(error);
      }

    })
  }
}

export function fetchOfficeEmployee() {
  return async dispatch => {
    // dispatch({ type: 'TOGGLE_LOADING', payload: true });
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        let token = JSON.parse(value).token;
        // console.log(token, 'ini valuuuuue tot')
        axios({
          method: 'GET',
          url: `http://35.240.174.62/api/employees/byCompany`,
          headers: {
            token,
          },
        })
          .then(({ data }) => {
            // console.log(data, 'ini datanya bangsaaaat!!!!!');
            data.forEach(employee => {
              employee.showOption = false;
              employee.contacts.forEach(partner => {
                partner.showOption = false;
              })
            })
            let filtered = data.filter(el=> el._id !== JSON.parse(value)._id)
            dispatch({ type: 'ADD_EMPLOYEE_BY_COMPANY', payload: filtered });
          })
          .catch(err => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function login() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_LOGIN', payload: true });
  };
}

export function uploadImageEmployee(file) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      // let imgFile = file
      try {
        const value = await AsyncStorage.getItem('token');
        let token = JSON.parse(value).token;

        const formData = new FormData();
        formData.append('image', {
          uri: file.uri,
          type: file.type,
          name: file.fileName
        })

        let { data } = await axios({
          method: 'PUT',
          url: `http://35.240.174.62/api/employees/uploadImage`,
          headers: {
            token,
            'Content-Type': 'multipart/form-data'
          },
          data: formData,
        });
        resolve(data)
      } catch (error) {
        console.log('error: ', error.response.data);
        reject(error)
      }
    });
  };
}

export function updateImage(imageURL) {
  return dispatch => {
    return new Promise ((resolve,reject)=>{
      dispatch({
       type: "UPDATE_EMPLOYEE_IMAGE",
       payload: imageURL
     })
     resolve()
    })
  }
}

// export function fetchEmpoleyee(params) {
//   params.employee.contacts.forEach(el => {
//     el.showOption = false;
//   });
//   // console.log(params.employee.contacts , 'ini pas fetch employee')
//   return dispatch => {
//     dispatch({type: 'FETCH_EMPLOYEE', payload: params});
//   };
// }

export function updateContacts(contacts) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        await dispatch({
          type: 'UPDATE_CONTACTS',
          payload: contacts,
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}

export function addContact(params) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          let token = JSON.parse(value).token;
          axios({
            method: 'PUT',
            url: `http://35.240.174.62/api/employees/contacts/${params.contact._id}`,
            headers: {
              token,
            },
          })
            .then(async () => {
              await dispatch({ type: 'ADD_CONTACT', payload: params.contact });
              resolve()
            })
            .catch(err => {
              reject(err);
            });
        }
      } catch (error) {
        // Error retrieving data
      }
    });
  };
}
export function toggleModal() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_MODAL' });
  };
}

export function toggleOption() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_OPTION' });
  };
}

export function toggleCard(el) {
  // console.log(el , 'ini elemen api menyerang')
  return dispatch => {
    dispatch({ type: 'TOGGLE_CARD', payload: el });
  };
}

export function toggleCardRecentRelations(el) {
  // console.log(el , 'ini elemen api menyerang')
  return dispatch => {
    dispatch({type: 'TOGGLE_CARD_RECENT_RELATIONS', payload: el});
  };
}

export function toggleCardRelationsPage(el) {
  // console.log(el , 'ini elemen api menyerang')
  return dispatch => {
    dispatch({type: 'TOGGLE_CARD_RELATIONS_PAGE', payload: el});
  };
}

export function setLoading() {
  return dispatch => {
    dispatch({ type: 'SET_LOADING' })
  }
}

export function deleteContact(_id) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const value = await AsyncStorage.getItem('token');
        let token = JSON.parse(value).token;
        let { data } = await axios({
          method: 'DELETE',
          url: `http://35.240.174.62/api/employees/contacts/${_id}`,
          headers: {
            token,
          },
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
