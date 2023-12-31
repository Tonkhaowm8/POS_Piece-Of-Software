import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet, Link, useLocation, } from "react-router-dom";
import Nav from './Components/SideNav/SideNav.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Stock from './Pages/Stock/Stock';
import Login from './Pages/Login/Login';
import Logout from './Pages/Logout/Logout';
import Payment from './Pages/Payment/Payment';
import { UsernameProvider } from './Pages/Login/UsernameContext.jsx'; // Import the UsernameProvider
import Users from './Pages/Users/User.jsx';


function App() {

  const [backendMessage, setBackendMessage] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('https://xyql0fuf33.execute-api.us-east-1.amazonaws.com/alphamale/api')
      .then(response => response.json())
      .then(data => setBackendMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const appClass = expanded ? '' : 'collapsed'; // Add or remove the "collapsed" class

  return (
    <UsernameProvider>
      <div className={`app ${appClass}`}>
        <Router>
          <Routes>
            {/* Conditionally render the Appheader that header would appear on every page except for login */}
            {['/stock', '/dashboard', 'users'].map(path => (
              <Route
                key={path}
                path={path}
                element={<AppHeader expanded={expanded} setExpanded={setExpanded} />}
              />
            ))}
            <Route path="/stock" element={<Stock />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/users" element={<Users />} />
          </Routes>
          <Nav show={expanded}>
            <Routes>
              <Route path="/" element={<Logout />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Nav>
        </Router>
      </div>
    </UsernameProvider>
  );
}

// Define a separate component for the header
function AppHeader({ expanded, setExpanded }) {
  return (
    <header>
      <GiHamburgerMenu onClick={() => setExpanded(!expanded)} />
    </header>
  );
}

export default App;
