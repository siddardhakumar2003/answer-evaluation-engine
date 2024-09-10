import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Start = () => {
  var count=0;
  
  const [loading, setLoading] = useState(true);

  const callPythonBackend = async () => {
    try {
      const res = await axios.get('http://localhost:5000/start');
      if(res.status===200)
        setLoading(false);
    } catch (error) {
      console.error("Error calling Python backend:", error);
    }
  };
  if(count===0){
    callPythonBackend();
    count++;
  }

  

// Run the function
return (
  <div className="Loading">
    {loading ? (
      <div className="loading-page">
        <h1>Loading..</h1>
      </div>
    ) : (
      <div className="completed-page">
        <h1>Database Updated!</h1>
        <Link to="/markslist">
            <button className='button-table'>Show Marks</button>
          </Link>
      </div>
    )}
  </div>
);

};

export default Start;