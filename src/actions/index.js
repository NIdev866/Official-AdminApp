import React from 'react';
import axios from 'axios';

import { SUBMIT_BANK_DETAILS } from './types.js';

import { 
  AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  NESTED_JOB_SECTORS,
  COMPANIES
} from './types.js';



const ROOT_URL = 'http://localhost:3000';

export function submitBankDetails(){
  return { 
    type: SUBMIT_BANK_DETAILS
  }
}








export function fetchNestedJobSectors(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/create-campaign/get-nested-job-sectors`)
      .then(response => {
        dispatch({ type: NESTED_JOB_SECTORS, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}

export function fetchCompanies(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/admin/companies`)
      .then(response => {
        dispatch({ type: COMPANIES, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}










export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        localStorage.setItem('admin_email', email);
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
      })
      .catch((err) => {
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
      .catch(err => {
        dispatch(authError(err));
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