// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.init';
import './Login.css';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [login, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [Google, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);


    if (user || googleUser) {
      navigate('/home');
    }

  const handleEmailLogin = (event) => {
    event.preventDefault();
    login(email, password);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    Google();
  };

  return (
    <div className="login-container">
      <h2>Answer Evaluation Engine</h2>
      {loading || googleLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form onSubmit={handleEmailLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login with Email</button>
          </form>
          <div>
            <button className='googlebutton' onClick={handleGoogleLogin}>Login with Google</button>
          </div>
        </>
      )}
      {error && <p>{error.message}</p>}
      {googleError && <p>{googleError.message}</p>}
    </div>
  );
};

export default Login;
