import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Nav from './Components/SideNav/SideNav.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Stock from './Pages/Stock/Stock';
import Login from './Pages/Login/Login';

function App() {

  const location = useLocation();
  const [backendMessage, setBackendMessage] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/api')
      .then(response => response.json())
      .then(data => setBackendMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Conditionally render the header based on the current route
  const renderHeader = location.pathname !== '/login';

  return (
      <div className='app'>
        <Router>
          {renderHeader && ( // Conditionally render the header
            <header>
              <GiHamburgerMenu onClick={() => setExpanded(!expanded)} />
            </header>
          )}
          <Nav show={expanded}>
            <Routes>
                <Route path='/stock' element={<Stock />} />
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
          </Nav>
          <Routes>
            <Route path='/login' element={<Login />} />
          </Routes>

        </Router>
      </div>
  );
}

export default App;
