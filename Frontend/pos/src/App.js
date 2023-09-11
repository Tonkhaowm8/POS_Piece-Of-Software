import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Nav from './components/SideNav';
import Dashboard from './pages/Dashboard';
import Stock from './pages/Stock';


function App() {

  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api')
      .then(response => response.json())
      .then(data => setBackendMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <Router>
        <header>HEADER</header>
        <Nav />
        <Routes>
          <Route path='/stock' index element={<Stock />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
