import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals.js';
import {BrowserRouter ,Routes , Route} from 'react-router-dom';
import Home from "./Home/Home.js";
import Loading from './Loading/Loading.js';
import Login from './Login/Login';
import Start from './Start/Start';
import ProtectedRoute from './ProtectedRoute.js';
import MarksList from './Start/MarksList.js';
 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/loading' element={<Loading/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/evaluate' element={<Start/>}/>
        <Route path='/markslist' element={<MarksList/>}/>
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();