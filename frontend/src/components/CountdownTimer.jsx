import React, { useState, useEffect } from 'react';

function CountdownTimer ({ time, started }) {
  const [timeRemaining, setTimeRemaining] = useState(time);
  const startTime = new Date(started);
  const endTime = new Date(startTime.getTime() + time * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimeRemaining((endTime - now) / 1000);
      if (timeRemaining <= 0) {
        clearInterval(interval);
        return 0;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time, started]);

  return (
    <div>
      {timeRemaining > 0
        ? (
        <div>Time remaining: {Math.floor(timeRemaining)} seconds</div>
          )
        : (
        <div>Time Ended</div>
          )}
    </div>
  );
}

export default CountdownTimer;
