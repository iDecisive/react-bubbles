import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  let history = useHistory();

  let [formInput, setFormInput] = useState({

    username: '',
    password: ''

  });

  let onInput = (event) => {

    setFormInput({

      ...formInput,
      [event.target.name]: event.target.value

    });

  }

  let sendLogin = (event) => {

    event.preventDefault();

    axios
    .post('http://localhost:5000/api/login', formInput)
    .then(response => {
      
      localStorage.setItem('token', response.data.payload);
      console.log(response)

      history.push('/bubbles');
    
    })
    .catch(error => console.log(error))

  }

  return (
    <form onSubmit={sendLogin}>
      <label>
        Username
        <input name='username' type='text' value={formInput.username} onChange={onInput}/>
      </label>

      <label>
        Password
        <input name='password' type='password' value={formInput.password} onChange={onInput}/>
      </label>

      <button>Submit</button>

    </form>
  );
};

export default Login;
