import { useState } from 'react';
import EnterDate from '../EnterDate/EnterDate';
import ShowCost from '../ShowCost/ShowCost';
import { MyContext } from './context.js'
import './App.css';
import './media.css'

function App() {
  let [price, setPrice] = useState(1000000)
  let [payment, setPayment] = useState(1)
  let [term, setTerm] = useState(10)
  let [bet, setBet] = useState(13)
  let [load, setLoad] = useState(false)
  const submitBtn = event => {
    console.log(event.target)
    setLoad(true)
    const body = {
      price,
      payment,
      term,
      bet
    }
    fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', { //https://jsonplaceholder.typicode.com/users // https://eoj3r7f3r4ef6v4.m.pipedream.net
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => setLoad(false))
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='title'>
          <p>Рассчитайте стоимость автомобиля в лизинг</p>
        </div>
        <form>
          <MyContext.Provider value={{ setPrice, setPayment, setTerm, setBet, submitBtn, load, price, payment, term, bet }}>
            <EnterDate />
            <ShowCost />
          </MyContext.Provider>
        </form>
      </div>
    </div>
  );
}

export default App;
