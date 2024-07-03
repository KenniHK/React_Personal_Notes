import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/api';

function LoginPage({ loginSuccess }) {
  const [error, setError] = useState(null);

  async function onLogin({ email, password }) {
    const result = await login({ email, password });
    if (!result.error) {
      console.log('Access Token:', result.data.accessToken);
      loginSuccess(result.data);
    } else {
      setError(result.message);
    }
  }

  return (
    <section className='login-page'>
      <h2 className='headApp'>Silakan masuk untuk melanjutkan</h2>
      {error && <p className='error'>{error}</p>}
      <LoginInput login={onLogin} />
      <p className='centertxt'>Belum punya akun? <Link to="/register" className='txtDaftar'>Daftar di sini.</Link></p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage;
