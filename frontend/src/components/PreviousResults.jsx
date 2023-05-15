import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { apiCall } from '../App';
import Navbar from './Navbar';

function PreviousResults () {
  const params = useParams();
  const navigate = useNavigate();
  const [previousSessionIds, setPreviousSessionIds] = useState([]);

  async function findPreviousResults () {
    const response = await apiCall(`admin/quiz/${params.gid}`, 'GET', {});
    if (response.error) {
      alert(response.error);
    } else {
      setPreviousSessionIds(response.oldSessions);
    }
  }

  useEffect(() => {
    findPreviousResults();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Previous Sessions</h1>
      {previousSessionIds.map((sessionId, index) => (
        <Button
          key={index}
          variant="contained"
          color="primary"
          style={{ margin: '8px' }}
          role="oldSession"
          onClick={() => navigate(`/Results/${params.gid}/${sessionId}`)}
        >
          {sessionId}
        </Button>
      ))}
    </div>
  );
}

export default PreviousResults;
