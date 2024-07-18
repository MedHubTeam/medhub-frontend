import React from 'react';
import UserLoginForm from '../components/loginPage/UserLoginForm';
import '../assets/styles/App.css';
import main_background from '../assets/images/main_background.png'; // Ensure correct path

function LoginPage() {
  return (
    <div className="App" style={{ backgroundImage: `url(${main_background})` }}>
      <header className="App-header">
        <UserLoginForm />
      </header>
    </div>
  );
}

export default LoginPage;
