import axios from "axios";
import endPointObj from '../endPointUrl.js';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionTypes";

const registerRequest = () => {
    return {
      type: REGISTER_REQUEST,
    };
  };
  
  const registerSuccess = () => {
    return {
      type: REGISTER_SUCCESS,
    };
  };
  
  const registerFailure = (errorMsg) => {
    return {
      type: REGISTER_FAILURE,
      payload: errorMsg,
    };
  };
  
  export const makeRegisterRequest = ({ emailId, pass, userPersona }) => (dispatch) => {
    dispatch(registerRequest());
    axios.get(endPointObj.url + '/getUser')
      .then((res) => {
        dispatch(checkUserExists(emailId, pass, userPersona, res.data));
      })
      .catch((err) => dispatch(registerFailure("Something went wrong")));
  };
  
  const checkUserExists = (emailId, pass, userPersona, usersData) => (dispatch) => {
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].emailId === emailId) {
        dispatch(registerFailure("user with the email id already exists"));
        return;
      }
    }
  
    dispatch(registerNewUser({ emailId, pass, userPersona }));
  };
  
  const registerNewUser = ({ emailId, pass, userPersona }) => (dispatch) => {
    let data = {
      emailId: emailId,
      pass: pass,
      userPersona: userPersona  
    }
    axios
      .post(endPointObj.url + '/signup/jobseeker', data)
      .then((res) => dispatch(registerSuccess()));
  };
  