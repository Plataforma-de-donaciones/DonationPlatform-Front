import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './testLogin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}


export default App;
