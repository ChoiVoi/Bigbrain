import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import QuizCard from './QuizCard';
import Navbar from './Navbar';

export default function Dashboard () {
  const [quizzes, setQuizzes] = React.useState([]);

  async function fetchAllQuizzes () {
    const response = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    const data = await response.json();
    setQuizzes(data.quizzes)
  }

  React.useEffect(async () => {
    await fetchAllQuizzes();
  }, []);

  return (
    <>
      <Navbar />
      Dashboard!
      <br /><br />
      <Button variant ="contained">
        <Link to="/CreateNewGame">create new game</Link>
      </Button>
      {quizzes.map((quiz) => {
        return (
          <QuizCard
            key={quiz.id}
            id={quiz.id}
            name={quiz.name}
            owner={quiz.owner}
            thumbnail={quiz.thumbnail}/>
        )
      })}
    </>
  )
}
