import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input'
import { useNavigate } from 'react-router-dom'
import UploadGameFile from './UploadGameFile.js';

function CreateNewGame () {
  const [newQuizName, setNewQuizName] = React.useState('');
  const navigate = useNavigate();
  const [uploadedGame, setUploadedGame] = React.useState('');

  async function newGame () {
    const response = await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: newQuizName,
      })
    });
    const data = await response.json();
    if (uploadedGame.name.endsWith('.json')) {
      UploadGameFile(data.quizId, newQuizName, uploadedGame);
      navigate('/Dashboard');
    } else {
      alert('Please select a JSON file only. A new Empty game is created instead')
    }
  }

  return (
    <>
      create new game! <br />
      <br />
      Form here for new game!<br />
      Name: <input value={newQuizName} onChange={(e) => setNewQuizName(e.target.value)}/><br /><br />
      <b>OPTIONAL</b><br />
      <Input type="file" accept=".json" onChange={(e) => setUploadedGame(e.target.files[0])}>upload game - json file only</Input>
      <Button onClick = {newGame}>create</Button>
    </>
  )
}

export default CreateNewGame;
