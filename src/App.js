import './App.css';
import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [name, setname] = useState("")

async function postName(e) {
  e.preventDefault()

  try {
    await axios.post("http://localhost:4000/post_name", {
      name
    })
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className="App">
      <form onSubmit={postName}>
        <input type = "text" value = {name} onChange={(e) => setname(e.target.value)} />
        <button type = "submit"> Send Name</button>
      </form>
    </div>
  );
}

export default App;
