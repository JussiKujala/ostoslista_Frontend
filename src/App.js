import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'http://localhost/ostoslistaBackend/'

function App() {

  const [items,setItems] = useState([]);

useEffect(() => {
  axios.get(URL)
  .then((response) => {
    //console.log(response.data);
    setItems(response.data);
  }).catch(error =>{
    alert(error);
  });
}, [])

  return (
    <div>
      <ol>
        {items?.map(item =>(
          <li key={item.id}>{item.description} {item.amount}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
