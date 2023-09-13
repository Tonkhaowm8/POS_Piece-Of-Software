import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './App.css';
import './Content.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Nav from './Components/SideNav/SideNav.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Stock from './Pages/Stock/Stock';


function App() {

  const [backendMessage, setBackendMessage] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/api')
      .then(response => response.json())
      .then(data => setBackendMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
      <div className='app'>
        <Router>
          <header><GiHamburgerMenu onClick={() => setExpanded(!expanded)}/></header>
          <Nav show={expanded}>

            <Routes>
                <Route path='/stock' element={<Stock />} />
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
          </Nav>

        </Router>
      </div>
  );
}

export default App;
