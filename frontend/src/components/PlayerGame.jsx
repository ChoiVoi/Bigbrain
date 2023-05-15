import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { apiCall } from '../App';
import Button from '@material-ui/core/Button';
import AnswerBox from './AnswerBox';
import CountdownTimer from './CountdownTimer';
import QuestionsResults from './QuestionsResults';
import sound from '../music/LobbySong.mp3';
import YouTubePlayer from './YouTubePlayer';

function PlayerGame () {
  const params = useParams();
  const [gameStarted, setGameStarted] = useState(false);
  const colors = ['#ff5a5a', '#5a9bff', '#9c55ff', '#55ff94'];
  const [counter, setCounter] = useState(0);
  const [playerQuestion, setPlayerQuestion] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState([]);
  const [hasQuestionEnd, setHasQuestionEnd] = useState(false);
  const [answer, setAnswer] = useState('');
  const [guess, setGuess] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);
  const [resultForGuess, setResultForGuess] = useState('');
  const audioRef = useRef(null);

  // Polling server functionality
  async function pollServer () {
    if (!gameStarted) {
      const response = await apiCall(`play/${params.playerId}/status`, 'GET', {});
      if (response.error) {
        alert(response.error);
      } else if (response.started) {
        setGameStarted(true);
      }
    } else if (gameStarted && !gameEnded) {
      const response = await apiCall(`play/${params.playerId}/question`, 'GET', {});
      if (response.error) {
        const results = await apiCall(`play/${params.playerId}/results`, 'GET', {});
        setQuizResults(results);
        setGameEnded(true);
      } else if (response.question.questionId !== playerQuestion.questionId) {
        setPlayerQuestion(response.question);
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
      pollServer();
    }, 500);

    if (playerQuestion && !gameEnded) {
      checkIfQuestionEnded();
    }

    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  // Game ended function player
  async function checkIfQuestionEnded () {
    const startTime = new Date(playerQuestion.isoTimeLastQuestionStarted);
    const endTime = new Date(startTime.getTime() + playerQuestion.time * 1000);
    const current = new Date();
    if (current.getTime() > endTime.getTime() && !hasQuestionEnd) {
      const response = await apiCall(`play/${params.playerId}/answer`, 'GET', {});
      if (!response.error) {
        setHasQuestionEnd(true);
        const currentAnswer = response.answerIds;
        if (Array.isArray(currentAnswer)) {
          setAnswer(currentAnswer.join(', '));
        } else {
          setAnswer(currentAnswer);
        }
      }
    }
  }

  // Answering
  function handleAnswerSelect (answer) {
    if (playerQuestion.questionType === 'single choice') {
      setCurrentAnswer([answer]);
    } else if (playerQuestion.questionType === 'multiple choice') {
      if (currentAnswer.includes(answer)) {
        setCurrentAnswer(currentAnswer.filter((a) => a !== answer));
      } else {
        setCurrentAnswer([...currentAnswer, answer]);
      }
    }
  }

  useEffect(() => {
    async function newAnswer () {
      await apiCall(`play/${params.playerId}/answer`, 'PUT', { answerIds: currentAnswer });
    }
    if (gameStarted && !gameEnded && currentAnswer.length > 0) {
      newAnswer();
    }
  }, [currentAnswer]);

  // new question
  useEffect(() => {
    setCurrentAnswer([]);
    setHasQuestionEnd(false);
  }, [playerQuestion]);

  // generate random number and players guess it in the lobby
  function generateRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    setRandomNumber(generateRandomNumber(1, 100));
  }, []);

  function checkGuess () {
    const guessInt = parseInt(guess);
    if (isNaN(guessInt)) {
      setResultForGuess('Please enter a valid number')
    } else if (guessInt === randomNumber) {
      setResultForGuess('Your guess is correct')
    } else if (guessInt > randomNumber) {
      setResultForGuess('Your guess is larger')
    } else if (guessInt < randomNumber) {
      setResultForGuess('Your guess is smaller')
    }
  }

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    }
    if (!gameStarted) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.pause();
    }
  }, [gameStarted]);

  return (
    <>
      {!gameStarted
        ? (<>
          {/* Lobby */}
          <h1>Lobby Screen</h1>
          Guess the number between 1 and 100!<br /><br />
          <input value={guess} onChange={(e) => setGuess(e.target.value)} /><br />
          <Button onClick={checkGuess}>check</Button><br />
          result: {resultForGuess}<br /><br /><br />
          <h2>Game session: {params.sessionId}</h2>
          <h3>Please wait</h3>
        </>)
        : (<>
          {/* In game */}
            {!gameEnded
              ? (
              <>
                <h1>Question: {playerQuestion.question}</h1>
                {playerQuestion.photoFile ? <img src={playerQuestion.photoFile} alt="My Image"/> : null}
                {playerQuestion.videoUrl ? <YouTubePlayer url={playerQuestion.videoUrl} width="640" height="360" /> : null }
                <h3>{playerQuestion.questionType}</h3>
                {Array.isArray(playerQuestion.options) && playerQuestion.options.length > 0
                  ? playerQuestion.options.map((answer, index) => (
                  <AnswerBox
                    key={`${playerQuestion.question}-${index}`}
                    answer={answer}
                    backgroundColor={colors[index]}
                    onSelect={handleAnswerSelect}
                    selected={currentAnswer.includes(answer)}
                  />
                  ))
                  : null}
                <CountdownTimer key={playerQuestion.questionId} time={playerQuestion.time} started={playerQuestion.isoTimeLastQuestionStarted} />
              </>
                )
              : (
              <>
                <div>
                  <QuestionsResults questions={quizResults} />
                </div>
              </>
                )
            }
            {hasQuestionEnd ? `Correct Answer: ${answer}` : null}
        </>)}
    </>
  );
}

export default PlayerGame;
