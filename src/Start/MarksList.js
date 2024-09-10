import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MarksList.css';

const MarksList = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/marks');
        setMarks(response.data);
      } catch (error) {
        console.error('Error fetching marks:', error);
      }

    };

    fetchMarks();
  }, []);

  return (
    <div className='table-container'>
      <h1 className='title'>Student Marks</h1>
      <table className='t'>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Question Number</th>
            <th>Spelling</th>
            <th>Score</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            <tr key={`${mark.rollno}-${mark.qno}`}>
              <td>{mark.rollno}</td>
              <td>{mark.qno}</td>
              <td>{mark.spell}</td>
              <td>{mark.score}</td>
              <td>{mark.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksList;
