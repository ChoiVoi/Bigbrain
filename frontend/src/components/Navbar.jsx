import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { apiCall } from '../App';

function Navbar () {
  const navigate = useNavigate();

  async function logout () {
    const response = await apiCall('admin/auth/logout', 'POST');
    if (response.error) {
      alert(response.error);
    } else {
      localStorage.removeItem('token');
      navigate('/SignIn');
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
      <Button variant="contained" color="secondary" onClick={() => navigate('/PlayJoin')}>Play Join</Button>
      <Button variant="contained" color="primary" onClick={() => navigate('/Dashboard')}>Dashboard</Button>
      <Button variant="contained" color="default" onClick={logout}>Logout</Button>
    </div>
  );
}

export default Navbar;
