import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'http://localhost/ostoslistaBackend/'

function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState('');
  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
        setAmounts(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }, [])

function save(e){
  e.preventDefault();
  const json = JSON.stringify({description:item,amount:amount});
  axios.post(URL + 'add.php',json, {
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then((response)=>{
    setItems(items => [...items,response.data]);
    setItem('');
    setAmounts(amounts => [...amounts,response.data]);
    setAmount('');
  }).catch(error => {
    alert(error.response ? error.response.data.error : error);
  });
}

function remove(id){
  const json = JSON.stringify({id:id})
  axios.post(URL + 'delete.php',json,{
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then((response) => {
    const newListWithoutRemoved = items.filter((item) => item.id !== id);
    setItems(newListWithoutRemoved);
  }).catch (error => {
    alert(error.response ? error.response.data.error : error);
  });
}

  return (
    <div id="container">
      <form onSubmit={save}>
        <label>New Item </label>
        <input placeholder='type description' value={item} onChange={e => setItem(e.target.value)} />
        <input placeholder='type amount' value={amount} onChange={e => setAmount(e.target.value)}/>
        <button>Add</button>
      </form>
      <ul>
        {items?.map(item => (
          <li key={item.id}>{item.description} {item.amount}
          <a href="#" onClick={() => remove(item.id)}>Delete</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
