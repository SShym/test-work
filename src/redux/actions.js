import axios from 'axios';
export const ERROR_DISPLAY_ON = 'ERROR_DISPLAY_ON';
export const ERROR_DISPLAY_OFF = 'ERROR_DISPLAY_OFF';
export const LOADER_DISPLAY_ON = 'LOADER_DISPLAY_ON';
export const LOADER_DISPLAY_OFF = 'LOADER_DISPLAY_OFF';
export const SET_ALL_PROFILES = 'SET_ALL_PROFILES';
export const SET_PROFILE = 'SET_PROFILE';
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';

export function errorOn(text){
  return dispatch => {
      dispatch({ type: ERROR_DISPLAY_ON, text });
  }
}

export function loaderOn(){
  return{
      type: LOADER_DISPLAY_ON,
  }
}

export function loaderOff(){
  return{
      type: LOADER_DISPLAY_OFF,
  }
}

export const auth = (formData) => async (dispatch) => {
    try {
      dispatch({ type: AUTH, data: formData });
    } catch (error) {
      dispatch(errorOn(error.response.status));
    }
};

export const getProfile = (id) => async (dispatch) => {
    try {
      dispatch(loaderOn());
      await axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res) => {
        dispatch({ type: SET_PROFILE, data: res.data});
        dispatch(loaderOff());
      })
    } catch (error) {
      dispatch(errorOn(error.response.status));
    }
};

export const getAllProfiles = () => async (dispatch) => {
    try {
      dispatch(loaderOn());
      await axios.get('https://rickandmortyapi.com/api/character').then((res) => {
        dispatch({ type: SET_ALL_PROFILES, data: res.data.results});
        dispatch(loaderOff());
      })
    } catch (error) {
      dispatch(loaderOff());
      dispatch(errorOn(error.response.status));
    }
};

