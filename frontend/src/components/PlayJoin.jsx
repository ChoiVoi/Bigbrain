import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid } from '@material-ui/core';
import { apiCall } from '../App';
import Navbar from './Navbar';

function PlayJoin () {
  // Your state and functions go here
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState('');
  const [sessionId, setSessionId] = useState('');

  async function handleSubmit () {
    const response = await apiCall(`play/join/${sessionId}`, 'POST', { name });
    if (response.error) {
      alert(response.error);
    } else {
      navigate(`/Game/${sessionId}/${response.playerId}`);
    }
  }

  useEffect(() => {
    if (params.sessionId) {
      setSessionId(params.sessionId);
    }
  }, []);

  return (
    <div>
      {localStorage.getItem('token') ? <Navbar /> : null}
      <h1>Join Game</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              id="sessionId-input"
              label="Session ID"
              value={sessionId}
              onChange={(event) => setSessionId(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="name-input"
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default PlayJoin;
