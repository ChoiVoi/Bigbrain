import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Radio, RadioGroup, FormControlLabel, Checkbox, FormGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { apiCall } from '../App';
import EditQuestion from './EditEachQuestion';

const cardStyles = makeStyles({
  root: {
    width: '18rem',
    marginLeft: '10px',
  },
});

function AddQuestions () {
  const classes = cardStyles();
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [oldQuestion, setOldQuestion] = React.useState([]);
  const [questionType, setQuestionType] = React.useState([]);
  const [point, setPoint] = React.useState([]);
  const [time, setTime] = React.useState('');
  const [quizName, setQuizName] = React.useState('');
  const [answer, setAnswer] = React.useState([]);
  const [option1Text, setOption1Text] = React.useState('');
  const [option2Text, setOption2Text] = React.useState('');
  const [option3Text, setOption3Text] = React.useState('');
  const [option4Text, setOption4Text] = React.useState('');
  const [videoUrl, setVideoUrl] = React.useState('');
  const [photoFile, setPhotoFile] = React.useState('');
  const [newQuestions, setNewQuestions] = React.useState([]);
  const [clickedEditButton, setClickedEditButton] = React.useState({});

  async function getQuizDetails () {
    const response = await fetch(`http://localhost:5005/admin/quiz/${params.gid}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    setOldQuestion(data.questions);
    setQuizName(data.name);
  }

  React.useEffect(async () => {
    await getQuizDetails();
  }, []);

  function addQuestion () {
    const optionList = [option1Text, option2Text, option3Text, option4Text];
    const allQuestions = [...oldQuestion, ...newQuestions];
    const maxQuestionId = allQuestions.length > 0 ? Math.max(...allQuestions.map((q) => q.questionId)) : 0;
    const questionsDetail = {
      questionType,
      questionId: maxQuestionId + 1,
      question,
      answer,
      time,
      point,
      videoUrl,
      photoFile,
      options: optionList,
    };
    console.log(maxQuestionId)

    setNewQuestions((prevQuestions) => [...prevQuestions, questionsDetail]); // Append new question to newQuestions array

    setQuestionType('');
    setQuestion('');
    setAnswer([]);
    setTime('');
    setPoint('');
    setOption1Text('');
    setOption2Text('');
    setOption3Text('');
    setOption4Text('');
    setVideoUrl('');
    setPhotoFile('');
  }

  async function finishAddingQuestions () {
    const mergedQuestions = [...oldQuestion, ...newQuestions]; // Merge old and new questions

    const payload = {
      questions: mergedQuestions, // Use mergedQuestions array as the questions in the payload
      name,
      thumbnail,
    };
    const response = await apiCall(`admin/quiz/${params.gid}`, 'PUT', payload);
    if (response.error) {
      alert(response.error);
    } else {
      navigate('/Dashboard');
    }
  }

  function handleChangeOption (event) {
    const { value, checked } = event.target;
    if (checked) {
      setAnswer((prevSetAnswer) => [...prevSetAnswer, value]);
    } else {
      setAnswer((prevSetAnswer) => prevSetAnswer.filter((option) => option !== value));
    }
  }

  function handleThumbnailChange (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handlePhotoUpload (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function deleteQ (questionId, quizId, name, thumbnail) {
    const updatedQuestions = oldQuestion.filter((question) => question.questionId !== questionId);
    const payload = {
      questions: updatedQuestions,
      name,
      thumbnail,
    };
    const response = await apiCall(`admin/quiz/${quizId}`, 'PUT', payload);
    if (response.error) {
      alert(response.error);
    } else {
      console.log(payload);
      setOldQuestion(updatedQuestions);
    }
  }

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <b>quiz name: {quizName}</b><br /><br />
        {oldQuestion.map((q) => (
          <>
            ------------------------------<br />
            <b>question id:</b> {q.questionId}<br />
            <b>question:</b> {q.question}<br />
            {q.videoUrl && (
              <><b>video URL:</b> <a href={q.videoUrl} target="_blank" rel="noopener noreferrer">{q.videoUrl}</a><br /></>
            )}
            {q.photoFile && (
              <><b>photo:</b> <img src={q.photoFile} /><br /></>
            )}
            <b>options:</b> {q.options[0]}, {q.options[1]}, {q.options[2]}, {q.options[3]} <br />
            <b>answer:</b> {q.answer}<br />
            <b>time:</b> {q.time} seconds<br />
            <b>point:</b> {q.point} <br /><br /><br />
            <>
              <Button
                variant="contained"
                onClick={() =>
                  setClickedEditButton({
                    ...clickedEditButton,
                    [q.questionId]: !clickedEditButton[q.questionId],
                  })
                }
              >
                {clickedEditButton[q.questionId] ? 'no Edit' : 'Edit question'}
              </Button>
              <br />
            </>
          {clickedEditButton[q.questionId] === true &&
            clickedEditButton[q.questionId] !== undefined && (
              <EditQuestion
                key={q.questionId}
                question_id={q.questionId}
                quiz_id={params.gid}
                name={name}
                thumbnail={thumbnail}
              />
          )}
            <Button variant="contained" onClick={() => deleteQ(q.questionId, params.gid, name, thumbnail)}>
              Delete question
            </Button><br /><br /><br />
          </>
        ))}
        <br /><br />
        <b>---UPDATE QUIZ---</b><br />
        new name: <input value={name} onChange={(e) => setName(e.target.value)} /><br />
        thumbnail: <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleThumbnailChange} /><br />
        <br />--- ADD QUESTION ---<br />
        Question type<br />
        - single choice: <input type="radio" value="single choice" checked={questionType === 'single choice'} onChange={(e) => setQuestionType(e.target.value)} /><br />
        - multiple choice: <input type="radio" value="multiple choice" checked={questionType === 'multiple choice'} onChange={(e) => setQuestionType(e.target.value)} /><br /><br />
        {questionType === 'single choice' && (
          <>
            <br />
              question: <input value={question} onChange={(e) => setQuestion(e.target.value)} /><br /><br />
              ---put questions below---<br /><br />
              Option 1:<input type="text" value={option1Text} onChange={(e) => setOption1Text(e.target.value)}/><br />
              Option 2:<input type="text" value={option2Text} onChange={(e) => setOption2Text(e.target.value)}/><br />
              Option 3:<input type="text" value={option3Text} onChange={(e) => setOption3Text(e.target.value)}/><br />
              Option 4:<input type="text" value={option4Text} onChange={(e) => setOption4Text(e.target.value)}/><br />
              <br />Answer:<br />
              <RadioGroup value={answer} onChange={(e) => setAnswer(e.target.value)}>
              <FormControlLabel value={option1Text} control={<Radio />} label={option1Text} />
              <FormControlLabel value={option2Text} control={<Radio />} label={option2Text} />
              <FormControlLabel value={option3Text} control={<Radio />} label={option3Text} />
              <FormControlLabel value={option4Text} control={<Radio />} label={option4Text} />
              </RadioGroup>
              time limit: <input value={time} onChange={(e) => setTime(e.target.value)} /><br />
              point: <input value={point} onChange={(e) => setPoint(e.target.value)} /><br />
              <div>
                <label htmlFor="videoUrl">Video URL: </label>
                <input
                  id="videoUrl"
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <br />
                {videoUrl && (
                  <video src={videoUrl} controls width="100%" height="auto" />
                )}
              </div>
              photo upload: <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handlePhotoUpload} /><br />
          </>
        )}
        {questionType === 'multiple choice' && (
          <>
            <br />
              question: <input value={question} onChange={(e) => setQuestion(e.target.value)} /><br /><br />
              ---put questions below---<br /><br />
              Option 1:<input type="text" value={option1Text} onChange={(e) => setOption1Text(e.target.value)}/><br />
              Option 2:<input type="text" value={option2Text} onChange={(e) => setOption2Text(e.target.value)}/><br />
              Option 3:<input type="text" value={option3Text} onChange={(e) => setOption3Text(e.target.value)}/><br />
              Option 4:<input type="text" value={option4Text} onChange={(e) => setOption4Text(e.target.value)}/><br />
              Answer:<br />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={answer.includes(option1Text)} onChange={handleChangeOption} value={option1Text} />}
                  label={option1Text}/>
                <FormControlLabel
                  control={<Checkbox checked={answer.includes(option2Text)} onChange={handleChangeOption} value={option2Text} />}
                  label={option2Text}/>
                <FormControlLabel
                  control={<Checkbox checked={answer.includes(option3Text)} onChange={handleChangeOption} value={option3Text} />}
                  label={option3Text}/>
                <FormControlLabel
                  control={<Checkbox checked={answer.includes(option4Text)} onChange={handleChangeOption} value={option4Text} />}
                  label={option4Text}/>
              </FormGroup>
              time: <input value={time} onChange={(e) => setTime(e.target.value)} /><br />
              point: <input value={point} onChange={(e) => setPoint(e.target.value)} /><br />
              video URL: <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} /><br />
              photo upload: <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handlePhotoUpload} /><br />
        </>
        )}
        <Button variant="contained" onClick={addQuestion}>Add Question</Button><br />
        <Button variant="contained" onClick={finishAddingQuestions}>Update</Button><br />
        <Button variant="contained" onClick={() => navigate('/Dashboard')}>go back to dashboard</Button>
      </CardContent>
    </Card>
  );
}

export default AddQuestions;
