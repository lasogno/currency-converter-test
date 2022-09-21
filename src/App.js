import './App.css';
import NavBar from './Navbar';
import ActiveCurrency from './ActiveCurrency';
import React from 'react';

function App() {
const [currency, setCurrency] = React.useState('RUB');

  return (
    <>
      <header className="app__header">
        <NavBar />
      </header>
      <main className='main'>
        <ActiveCurrency value={currency} changeBaseCurrency={setCurrency}/>
      </main>
    </>
  );
}

export default App;
