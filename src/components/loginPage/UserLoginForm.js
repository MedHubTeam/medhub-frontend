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
        <div className="test"></div>
        <form onSubmit={onLoginSubmit}>
          <label>
            Username: <input username = "username"/>
          </label>
          <label>
            Password: <input password = "password" />
          </label>
          <button type= "submit">Submit</button>
        </form>
    </div>
  );
}
