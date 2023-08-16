import React, { useEffect, useState } from 'react';
import './App.css';

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
    </div>
  );
}

export default App;
