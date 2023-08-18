import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Stock from './pages/Stock';

function App() {

  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => setBackendMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Hello from React Frontend!</h1>
      <p>Message from the backend: {backendMessage}</p>
      {/* <BrowserRouter>
        <Routes>
          <Route index element={<Stock />} />
          <Route path="/stock" element={<Stock />} />\
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
