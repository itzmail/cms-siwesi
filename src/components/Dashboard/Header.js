import React from 'react';

import Logout from '../Logout';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <h1>CMS SI Wesi</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => navigate('/add')}>Add Data</button>
        <Logout />
      </div>
    </header>
  );
};

export default Header;
