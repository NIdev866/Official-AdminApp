import React from 'react';
import axios from 'axios';

import { SUBMIT_BANK_DETAILS } from './types.js';

import { 
  AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  JOB_SECTORS
} from './types.js';



const ROOT_URL = 'http://localhost:3000';

export function submitBankDetails(){
  return { 
    type: SUBMIT_BANK_DETAILS
  }
}







export function fetchJobSectors(){
  return function(dispatch) {
    axios.get(`${ROOT_URL}/createCampaign/fetchJobSectors`)
      .then(response => {
        console.log(response)
        dispatch({ type: JOB_SECTORS, payload: response });
      })
      .catch(() => {
        dispatch('couldnt fetch job sectors');
      });
  };
}








export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        localStorage.setItem('admin_email', email);
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
      })
      .catch(() => {
        dispatch(authError('Bad Sign-in Information'));
      });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        localStorage.setItem('admin_email', email);
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function signoutUser(error) {
  localStorage.removeItem('token');
  localStorage.removeItem('admin_email');
  return {
    type: UNAUTH_USER
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function clearAuthError(error) {
  return {
    type: CLEAR_AUTH_ERROR
  };
}