import React from 'react';
import Button from '@material-ui/core/Button';

function AnswerBox ({ answer, backgroundColor, onSelect, selected }) {
  const answerBoxStyle = {
    display: 'inline-block',
    padding: '16px',
    margin: '8px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: selected ? '#ccc' : backgroundColor,
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(answer);
    }
  };

  return <Button onClick={handleClick} style={answerBoxStyle}>{answer}</Button>;
}

export default AnswerBox;
