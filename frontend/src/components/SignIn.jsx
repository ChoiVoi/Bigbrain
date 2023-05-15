import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { apiCall } from '../App';

function SignIn () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  async function login () {
    const payload = {
      email,
      password,
    }
    const response = await apiCall('admin/auth/login', 'POST', payload);
    if (response.error) {
      alert(response.error);
    } else {
      localStorage.setItem('token', response.token);
      navigate('/Dashboard');
    }
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => navigate('/PlayJoin')}>Play Join</Button>
      <h1>LOGIN</h1>
      Email: <input name="email" id="email" value = {email} onChange ={(e) => setEmail(e.target.value)} /><br />
      Password: <input name="password" id="password" value = {password} onChange = {(e) => setPassword(e.target.value)} /><br />
      <Button onClick={login}>Sign in</Button>
      <Button onClick= {() => navigate('/SignUp')}>Register</Button>
    </>
  )
}

export default SignIn;
