import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import CreateNewGame from './components/CreateNewGame';
import UpdateGame from './components/UpdateGame';
import Game from './components/Game';
import Results from './components/Results';
import PlayJoin from './components/PlayJoin';
import PlayerGame from './components/PlayerGame';
import PreviousResults from './components/PreviousResults';

export default function App () {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/CreateNewGame" element={<CreateNewGame />} />
          <Route path="/UpdateGame/:gid" element={<UpdateGame />} />
          <Route path="/PlayJoin" element={<PlayJoin />} />
          <Route path="/PlayJoin/:sessionId" element={<PlayJoin />} />
          <Route path="/Game/:sessionId/:playerId" element={<PlayerGame />} />
          <Route path="/Game/:sessionId/:gid/admin" element={<Game />} />
          <Route path="/Results/:gid/:sessionId" element={<Results />}/>
          <Route path="/PreviousResults/:gid" element={<PreviousResults />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Home () {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/Dashboard');
    } else {
      navigate('/SignIn');
    }
  }, [navigate]);

  return (
    <div>
      <h3>HOME</h3>
    </div>
  )
}

const apiCall = async (path, method, payload) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const url = new URL('http://localhost:5005/' + path);

  if (method === 'GET') {
    Object.keys(payload).forEach(key => url.searchParams.append(key, payload[key]));
  } else {
    options.body = JSON.stringify(payload);
  }

  if (localStorage.getItem('token')) {
    options.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export { apiCall };
