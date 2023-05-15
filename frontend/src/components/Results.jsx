import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { apiCall } from '../App';
import BarChartComponent from './BarChartComponent.jsx';
import LineChartComponent from './LineChartComponent.jsx';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

function Results () {
  const navigate = useNavigate();
  const params = useParams();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [numPlayers, setnumPlayers] = useState(0);

  async function getResults () {
    const response = await apiCall(`admin/session/${params.sessionId}/results`, 'GET', {});
    if (response.error) {
      alert(response.error);
    } else {
      setnumPlayers(response.results.length);
      const quizData = await apiCall(`admin/quiz/${params.gid}`, 'GET', {});
      if (quizData.error) {
        alert(quizData.error);
      } else {
        const pointsEachAnswer = quizData.questions.map((q) => parseInt(q.point));
        const leaderboard = [];
        const stats = Array.from({ length: pointsEachAnswer.length }, () => ({
          correctAnswersPerQuestion: 0,
          averageResponseTime: -1,
          responsesFrequency: {},
        }));
        for (const user of response.results) {
          leaderboard.push({ name: user.name, score: 0 });
          for (const [i, answer] of user.answers.entries()) {
            if (answer.correct) {
              leaderboard[leaderboard.length - 1].score += pointsEachAnswer[i];
            }
            const answeredAtDate = new Date(answer.answeredAt);
            const questionStartedAtDate = new Date(answer.questionStartedAt);
            const timeDifferenceMilliseconds = answeredAtDate - questionStartedAtDate;
            const timeDifferenceSeconds = timeDifferenceMilliseconds / 1000;
            if (stats[i].averageResponseTime !== -1) {
              stats[i].averageResponseTime = (stats[i].averageResponseTime + timeDifferenceSeconds) / 2;
            } else {
              stats[i].averageResponseTime = timeDifferenceSeconds;
            }
            const answerKey = answer.answerIds.join(', ');
            if (answerKey in stats[i].responsesFrequency) {
              stats[i].responsesFrequency[answerKey] += 1;
            } else {
              stats[i].responsesFrequency[answerKey] = 1;
            }
            if (answer.correct) {
              stats[i].correctAnswersPerQuestion += 1;
            }
          }
        }
        const topPlayers = leaderboard.sort((a, b) => b.score - a.score).slice(0, 5);
        setLeaderboardData(topPlayers);
        setStatsData(stats);
      }
    }
  }

  useEffect(() => {
    getResults();
  }, []);

  const correctAnswersPercentageData = statsData.map((stat, index) => ({
    question: index + 1,
    percentage: (stat.correctAnswersPerQuestion / numPlayers) * 100,
  }));

  const averageResponseTimeData = statsData.map((stat, index) => ({
    question: index + 1,
    avgResponseTime: stat.averageResponseTime,
  }));

  return (
    <>
      <Button onClick={() => navigate('/Dashboard')}>Dashboard</Button>
      <div>
        <h2>Leaderboard</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <BarChartComponent data={correctAnswersPercentageData} /><br /><br />
        <LineChartComponent data={averageResponseTimeData} />
      </div>
    </>
  );
}

export default Results;
