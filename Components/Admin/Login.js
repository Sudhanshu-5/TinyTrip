import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import useAuth from './useAuth';
import axios from 'axios';
import './Login.css';

function Login() {
  const history = useHistory();

  let initVals = { username: '', password: '' };
  const [vals, setVal] = useState(initVals);
  const [warn, setWarn] = useState('');

  const [authorise, unauthorise, ProtectedRoutes] = useAuth();

  if(unauthorise===ProtectedRoutes)
    console.log("")

  const { addToast } = useToasts();

  const RedirectTo = () => {
    if (warn === 'success') {
      authorise();
      history.push('/adminDashboard');
    }
  };

  useEffect(() => {
    RedirectTo();
  }, [warn])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({...vals, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = vals;
    await axios.post('/login', { 
        username,
        password
      })
      .then((res) => {
        if(res.data.msg === 'success') {
          addToast('Success', { appearance: 'success', autoDismiss: true });
        }
        else {
          addToast(res.data.msg, { appearance: 'error', autoDismiss: true })
        }
        setWarn(res.data.msg);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="imgWrapper">
    <title>Admin Login</title>
    <div id="container">
      <header>Admin Login</header>
      <form onSubmit={handleSubmit}>
        <fieldset>
            <br/>
            <input type="text" name="username" id="username" placeholder="Username" onChange={handleChange} required autoFocus />
            <br/><br/>
            <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} required />
            <br/><br/>
            <label htmlFor="submit"></label>
            <input type="submit" name="submit" id="submit" value="Login" />
        </fieldset>
      </form>
    </div>
    </div>
  )
};

export default Login;