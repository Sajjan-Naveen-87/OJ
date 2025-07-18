// Problems.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const levelColors = {
  Easy: 'bg-green-200 text-green-800',
  Medium: 'bg-yellow-200 text-yellow-800',
  Hard: 'bg-red-200 text-red-800',
  Extreme: 'bg-purple-200 text-purple-800',
};

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/problems/')
      .then((res) => setProblems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSolve = (id) => {
    navigate(`/compiler/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🧠 Problem List</h1>
      <div className="grid gap-4">
        {problems.map((problem) => (
          <div
            key={problem.problem_id}
            className={`p-4 rounded-xl shadow-md hover:shadow-lg transition-all border ${levelColors[problem.problem_level]} `}
          >
            <h2 className="text-xl font-semibold">{problem.title}</h2>
            <p className="mt-1 text-sm">Level: {problem.problem_level}</p>
            <p className="text-sm">Points: {problem.points_awarded}</p>
            <p className="text-sm">Accuracy: {problem.accuracy.toFixed(2)}%</p>
            <button
              onClick={() => handleSolve(problem.problem_id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Solve Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problems;