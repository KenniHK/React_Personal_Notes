import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChangeHandler = (event) => setEmail(event.target.value);
  const onPasswordChangeHandler = (event) => setPassword(event.target.value);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <div className='card'>
      <form onSubmit={onSubmitHandler} className='register-input'>
        <input type="email" placeholder='Email' value={email} onChange={onEmailChangeHandler} />
        <input type="password" placeholder='Password' value={password} onChange={onPasswordChangeHandler} />
        <button className='buttonRegis'>Masuk</button>
      </form>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginInput;
