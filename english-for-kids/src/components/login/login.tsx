import React, { useState } from 'react';
import useActions from '../../hooks/useActions';
import useToken from '../../hooks/useToken';
import IUser from '../../models/IUser';
import { SERVER_URL } from '../../shared/constants';
import loginUser from '../../shared/loginUser';
import './login.scss';

const Login: React.FC<{ className: string; hideForm: () => void }> = ({ className, hideForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useActions();
  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    hideForm();
    setToken(token);
  };
  return (
    <div className={`login__wrapper ${className}`}>
      <div className="login__body">
        <form action="POST" className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="username">
            <p>Username</p>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            />
          </label>
          <div>
            <button type="button" onClick={hideForm}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
