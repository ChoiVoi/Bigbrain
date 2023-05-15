import React from 'react';
import { Radio, RadioGroup, FormControlLabel, Checkbox, FormGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { apiCall } from '../App';

export default function EditEachQuestion (props) {
  const { question_id: questionId, quiz_id: quizId, name, thumbnail } = props;
  const [questions, setQuestions] = React.useState([]);
  const [answer, setAnswer] = React.useState([]);
  const [option1Text, setOption1Text] = React.useState('');
  const [option2Text, setOption2Text] = React.useState('');
  const [option3Text, setOption3Text] = React.useState('');
  const [option4Text, setOption4Text] = React.useState('');
  const [videoUrl, setVideoUrl] = React.useState('');
  const [photoFile, setPhotoFile] = React.useState('');
  const [point, setPoint] = React.useState([]);
  const [time, setTime] = React.useState('');
  const [questionType, setQuestionType] = React.useState([]);
  const [newQuestion, setNewQuestion] = React.useState('');
  const [showEdit, setShowEdit] = React.useState(true)

  async function getQuizDetails () {
    const response = await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    setQuestions(data.questions);
  }

  async function editQuestionDetails () {
    const optionList = [option1Text, option2Text, option3Text, option4Text];
    const questionDetail = {
      questionType,
      questionId,
      newQuestion,
      answer,
      time,
      point,
      videoUrl,
      photoFile,
      options: optionList,
    }

    const updatedQuestions = questions.map((question) => {
      if (question.questionId === questionId) {
        return { ...question, ...questionDetail };
      }
      return question;
    });

    const payload = {
      questions: updatedQuestions,
      name,
      thumbnail,
    };
    const response = await apiCall(`admin/quiz/${quizId}`, 'PUT', payload);
    if (response.error) {
      alert(response.error);
    } else {
      setShowEdit(false)
      setQuestions(updatedQuestions);
    }
  }

  React.useEffect(async () => {
    await getQuizDetails();
  }, []);

  function handleChangeOption (event) {
    const { value, checked } = event.target;
    if (checked) {
      setAnswer((prevSetAnswer) => [...prevSetAnswer, value]);
    } else {
      setAnswer((prevSetAnswer) => prevSetAnswer.filter((option) => option !== value));
    }
  }

  function handleUrlUpload (event) {
    setVideoUrl(event.target.value);
  }

  function handlePhotoUpload (event) {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(URL.createObjectURL(file));
    }
  }

  return (
    <div>
      {showEdit === true && (
        <>
          <br />--- EDITING ---<br />
          Question type<br />
          - single choice: <input type="radio" value="single choice" checked={questionType === 'single choice'} onChange={(e) => setQuestionType(e.target.value)} /><br />
          - multiple choice: <input type="radio" value="multiple choice" checked={questionType === 'multiple choice'} onChange={(e) => setQuestionType(e.target.value)} /><br /><br />
          {questionType === 'single choice' && (
            <>
              <br />
              question: <input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} /><br /><br />
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
              video URL: <input value={videoUrl} onChange={handleUrlUpload} /><br />
              photo upload: <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handlePhotoUpload} /><br />
            </>
          )}
          {questionType === 'multiple choice' && (
            <>
              <br />
              question: <input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} /><br /><br />
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
          <Button variant="contained" onClick={editQuestionDetails}>Edit question</Button><br />
        </>
      )}
    </div>
  )
}
