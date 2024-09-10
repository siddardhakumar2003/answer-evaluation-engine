// src/App.js
import React from 'react';
import Home from './Home/Home';
import Loading from './Loading/Loading';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MarksList from './Start/MarksList.js';
const App = () => {
  return (
    <Router>
      <div className="App">
      <Route path="/markslist" component={MarksList} />
    </div>
    </Router>
  );
};

export default App;
