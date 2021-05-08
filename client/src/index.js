import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import jwtDecode from 'jwt-decode'
import * as Types from "./store/actions/types"
import setAuthHeader from './utils/setAuthHeader'

const token = localStorage.getItem('auth_token')
if(token){
  setAuthHeader(token)
  let decode=jwtDecode(token)
  store.dispatch({
    type: Types.LOGIN_USER,
    payload:{
      user: decode
    }
  })
}



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App /> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
