import '../../assets/styles/LoginForm.css';
import React, { useCallback } from 'react';
import loginService from '../../services/loginService.js';

export default function LoginForm() {
  const onLoginSubmit = useCallback(async (event) => {
    event.preventDefault();
    const target = event.target;
    const identifier = target[0].value;
    const password = target[1].value;
    console.log(await loginService(identifier, password));
  }, []);

  return (
    <div className="modern-login-container">
      <div className="login-form">
        <h1>Welcome back!</h1>
        <p>Enter to get unlimited access to data & information.</p>
        <form onSubmit={onLoginSubmit}>
          <label htmlFor="identifier">Username or Email</label>
          <input
            type="text"
            id="identifier"
            data-testid="identifierLoginInput"
            placeholder="Enter your username or email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            data-testid="passwordLoginInput"
            placeholder="Enter your password"
            required
          />
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot your password?</a>
          </div>
          <button
            type="submit"
            data-testid="submitLoginInputButton">
            Log In
          </button>
          <p>Don’t have an account? <a href="#">Register here</a></p>
        </form>
      </div>
      <div className="login-artwork">
        {/* additional elements */}
      </div>
    </div>
  );
}
