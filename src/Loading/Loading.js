import React, { useEffect, useState } from 'react';
import './Loading.css';

function Loading() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 20000); // 10000 milliseconds = 10 seconds

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Loading">
      {loading ? (
        <div className="loading-page">
          <h1>Loading..</h1>
        </div>
      ) : (
        <div className="completed-page">
          <h1>OCR Completed!</h1>
          <a href='/evaluate' className='styled-link' >Start Evaluation</a>
        </div>
      )}
    </div>
  );
}

export default Loading;
