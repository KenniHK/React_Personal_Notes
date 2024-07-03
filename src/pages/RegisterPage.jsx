import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/api';

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className='register-page'>
      <RegisterInput register={onRegisterHandler} />
      <p className='centertxt'>Kembali ke <Link to="/" className='txtDaftar'>Masuk</Link></p>
    </section>
  );
}

export default RegisterPage;
