import '../../assets/styles/LoginForm.css'
import React, {useCallback} from 'react'
import loginService from '../../services/loginService.js';

export default function LoginForm() {

  const onLoginSubmit = useCallback(async (event) => {
    event.preventDefault();
    const target = event.target;
    const username= target[0].value;
    const password= target[1].value;
    console.log(await loginService(username, password))
  },[]);



  return (
    <div>
        <div className="LoginForm">
            <form onSubmit={onLoginSubmit}>
                <input data-testid="usernameLoginInput" placeholder="Enter your username" />
                <input type="password" data-testid="passwordLoginInput" placeholder="Enter your password" />
                <button type="submit" data-testid="submitLoginInputButton">Submit</button>
            </form>
        </div>
    </div>
  );
}
