import React, { useEffect, useState } from 'react';
import useActions from '../../hooks/useActions';
import loginUser from '../../shared/loginUser';
import './login.scss';

const LOOGIN_DETAILS = 'admin';

const Login: React.FC<{ className: string; hideForm: () => void }> = ({ className, hideForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formvalid, setFormValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const { setToken } = useActions();

  useEffect(() => {
    setFormValid(usernameValid && passwordValid);
  }, [usernameValid, passwordValid]);

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    hideForm();
    setToken(token);
  };
  const errorClass = (state: boolean): string => (state ? '' : 'invalid');

  return (
    <div className={`login__wrapper ${className}`}>
      <div className="login__body">
        <h3 className="login__title">Login</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              className={`login__input ${errorClass(usernameValid)}`}
              type="text"
              id="username"
              name="username"
              placeholder={LOOGIN_DETAILS}
              required
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameValid(e.target.value === LOOGIN_DETAILS);
              }}
            />
          </div>
          <div className="login__input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              className={`login__input ${errorClass(passwordValid)}`}
              type="password"
              id="password"
              name="password"
              placeholder={LOOGIN_DETAILS}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordValid(e.target.value === LOOGIN_DETAILS);
              }}
            />
          </div>
          <button className="login__cancel" type="button" onClick={hideForm}></button>
          <button className="login__submit" type="submit" disabled={!formvalid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
