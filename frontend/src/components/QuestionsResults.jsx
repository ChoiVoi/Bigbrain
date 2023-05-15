import React from 'react';
import { Typography, Box, Chip } from '@material-ui/core';

const QuestionsResults = ({ questions }) => {
  const correctCount = questions.reduce((count, question) => {
    return question.correct ? count + 1 : count;
  }, 0);

  return (
    <Box>
      <Typography variant="h4">Quiz Results</Typography>
      <Typography variant="h6">
        {correctCount} out of {questions.length} correct
      </Typography>
      {questions.map((question, index) => (
        <Box key={index}>
          <Typography variant="h6">Question {index + 1}</Typography>
          <Chip
            label={question.correct ? 'Correct' : 'Incorrect'}
            color={question.correct ? 'primary' : 'secondary'}
          />
        </Box>
      ))}
    </Box>
  );
};

export default QuestionsResults;
