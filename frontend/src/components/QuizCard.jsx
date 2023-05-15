import React from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { apiCall } from '../App';
import copy from 'copy-to-clipboard';

import Modal from 'react-modal';

const cardStyles = makeStyles({
  root: {
    width: '18rem',
    marginLeft: '10px'
  }
})

function QuizCard (props) {
  const { id, name, owner, thumbnail } = props;
  const classes = cardStyles();
  const navigate = useNavigate();
  const [updateQuizButton, setUpdateQuizButton] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [sessionId, setSessionId] = React.useState('');
  const [lastSessionId, setLastSessionId] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [resultsPopup, setResultsPopup] = React.useState(false);

  async function startQuiz () {
    if (sessionId) {
      await apiCall(`admin/quiz/${id}/end`, 'POST');
      setLastSessionId(sessionId);
      setSessionId('');
      setResultsPopup(true);
      return;
    }
    const response = await apiCall(`admin/quiz/${id}/start`, 'POST');
    if (response.error) {
      alert(response.error);
    } else {
      const response1 = await apiCall(`admin/quiz/${id}`, 'GET', {});
      if (response1.error) {
        alert(response1.error);
      } else {
        setSessionId(response1.active);
        setOpenDialog(true);
      }
    }
  }

  function copyLink () {
    const url = `${window.location.origin}/PlayJoin/${sessionId}`;
    copy(url);
  }

  function goToGame () {
    navigate(`/Game/${sessionId}/${id}/admin`);
  }

  function goToResults () {
    navigate(`/Results/${id}/${lastSessionId}`);
  }

  const popupStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '150px',
      background: 'white',
      borderRadius: '4px',
      padding: '20px',
    },
  };

  const dialog = (
    <Modal
      isOpen={openDialog}
      onRequestClose={() => setOpenDialog(false)}
      contentLabel="Session ID"
      style={popupStyle}
    >
      <h2>Session ID</h2>
      <p>{sessionId}</p>
      <div>
        <Button onClick={copyLink}>Copy Link</Button>
        <Button onClick={goToGame}>join lobby</Button>
        <Button onClick={() => setOpenDialog(false)}>Close</Button>
      </div>
    </Modal>
  );

  const viewResults = (
    <Modal
      isOpen={resultsPopup}
      onRequestClose={() => setResultsPopup(false)}
      contentLabel="Results Popup"
      style={popupStyle}
    >
      <h2>Would you like to view the results?</h2>
      <div>
        <Button onClick={goToResults}>See Results</Button>
        <Button onClick={() => setResultsPopup(false)}>Close</Button>
      </div>
    </Modal>
  );

  async function getQuizDetails () {
    const response = await fetch(`http://localhost:5005/admin/quiz/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    const data = await response.json();
    if (data.active) {
      setSessionId(data.active);
    }
    setQuestions(data.questions);
  }

  async function deleteButton () {
    const response = await apiCall(`admin/quiz/${id}`, 'DELETE');
    if (response.error) {
      alert(response.error);
    } else {
      navigate('/');
    }
  }

  React.useEffect(async () => {
    await getQuizDetails();
  }, []);

  if (updateQuizButton) {
    const url = generatePath('/UpdateGame/:id', { id });
    navigate(url);
  }

  return (
    <>
      {dialog}
      {viewResults}
      <Card variant="outlined" className={classes.root}>
        <CardContent>
        <img src={thumbnail}></img>
          <b>quiz Id:</b> {id}<br />
          <b>quiz name:</b> {name}<br />
          <b>owner:</b> {owner}<br />
          <b>{questions.length === 0 ? 'No questions yet' : questions.length === 1 ? 'there is ' + questions.length + ' question' : 'there are ' + questions.length + ' questions'}</b><br />
          <b>time limit:</b> {questions.reduce((totalTime, q) => totalTime + parseInt(q.time), 0).toLocaleString()} seconds
          <br /><br />
          <Button onClick={() => startQuiz()}>{sessionId ? 'Stop' : 'Start'}</Button>
          <Button onClick={() => setUpdateQuizButton(true)}>Update Quiz</Button>
          <Button onClick={() => navigate(`/PreviousResults/${id}`)}>Past Results</Button>
          <Button onClick={deleteButton}>Delete Quiz</Button>
        </CardContent>
      </Card>
    </>
  )
}

export default QuizCard;
