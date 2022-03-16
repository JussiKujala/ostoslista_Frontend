import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'http://localhost/ostoslistaBackend/'

function App() {

  const [tasks,setTasks] = useState([]);

useEffect(() => {
  axios.get(URL)
  .then((response) => {
    console.log(response.data);
  }).catch(error =>{
  });
}, [])

  return (
    <div className="App">
test
    </div>
  );
}

export default App;
