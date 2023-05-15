import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { apiCall } from '../App';
import AnswerBox from './AnswerBox';
import CountdownTimer from './CountdownTimer';

function Game () {
  const navigate = useNavigate();
  const params = useParams();
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);
  const colors = ['#ff5a5a', '#5a9bff', '#9c55ff', '#55ff94'];

  // Admin functionality
  useEffect(() => {
    let isMounted = true;

    async function startGame () {
      if (isMounted) {
        await apiCall(`admin/quiz/${params.gid}/advance`, 'POST', {});
        const response = await apiCall(`admin/session/${params.sessionId}/status`, 'GET', {});
        const q = response.results.questions;
        setQuestions(q);
      }
    }

    if (gameStarted) {
      startGame();
    }

    return () => {
      isMounted = false;
    };
  }, [gameStarted, params.gid, params.sessionId]);

  // Admin controls

  async function stopGame () {
    await apiCall(`admin/quiz/${params.gid}/end`, 'POST');
    navigate(`/Results/${params.gid}/${params.sessionId}`);
  }

  async function advanceGame () {
    const response = await apiCall(`admin/quiz/${params.gid}/advance`, 'POST', {});
    if (response.error) {
      alert(response.error);
    } else {
      const response1 = await apiCall(`admin/session/${params.sessionId}/status`, 'GET', {});
      if (response1.results.position === response1.results.questions.length) {
        navigate(`/Results/${params.gid}/${params.sessionId}`);
      }
      setQuestionNum(questionNum + 1);
    }
  }

  return (
    <>
      {!gameStarted
        ? (<>
          {/* Lobby */}
          <h1>Lobby Screen</h1>
          <h2>Game session: {params.sessionId}</h2>
          <Button onClick={() => setGameStarted(true)}>Start</Button>
        </>)
        : (<>
          {/* In game */}
          <Button onClick={advanceGame}>Advance</Button>
          <Button onClick={stopGame}>End</Button>
          <h1>Question: {questionNum + 1}</h1>
          {questions.length > 0 && questionNum !== questions.length
            ? (<>
            <div key={questions[questionNum].questionId}>
              <h2>{questions[questionNum].question}</h2>
              {questions[questionNum].photoFile
                ? (
                  <img src={questions[questionNum].photoFile}></img>
                  )
                : null}
            </div>
            <h3>{questions[questionNum].questionType}</h3>
            {Array.isArray(questions[questionNum].options)
              ? (questions[questionNum].options.map((answer, index) => (
                <AnswerBox
                  key={`${questions[questionNum].question}-${index}`}
                  answer={answer}
                  backgroundColor={colors[index]}
                />
                )))
              : null}
            <CountdownTimer key={questionNum} time={questions[questionNum].time} started={new Date().toISOString()} />
          </>)
            : null}
        </>)}
    </>
  );
}

export default Game;
