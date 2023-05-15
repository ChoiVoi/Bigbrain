import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { apiCall } from '../App';

function SignUp () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

  async function register () {
    const payload = {
      email,
      password,
      name,
    }
    const response = await apiCall('admin/auth/register', 'POST', payload);
    if (response.error) {
      alert(response.error);
    } else {
      localStorage.setItem('token', response.token);
      navigate('/Dashboard');
    }
  }

  return (
    <>
      <h1>REGISTER</h1>
      Email: <input name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      Password: <input name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      Name: <input name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <Button onClick={register}>Register</Button>
      <Button onClick={() => navigate('/SignIn')}>Sign in</Button>
    </>
  )
}

export default SignUp;
