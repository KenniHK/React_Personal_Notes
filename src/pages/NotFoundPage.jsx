import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1><br></br>
      <p>Oops! Halaman yang dicari tidak ditemukan.</p><br></br>
      <div className='tes'>
      <Link to="/" >Kembali ke Home</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
