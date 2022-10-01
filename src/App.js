import './App.css';
import NavBar from './Navbar';
import ActiveCurrency from './ActiveCurrency';
import Calculate from './Calculator';
import Courses from './Courses';
import React from 'react';
import { Container } from 'react-bootstrap';

function App() {
const [currency, setCurrency] = React.useState('RUB');

  return (
    <>
      <header className="app__header">
        <NavBar />
      </header>
      <main className='main'>
      <Container className='main__container mb-3'>
        <ActiveCurrency value={currency} changeBaseCurrency={setCurrency} className="mb-3"/>
        <Courses value={currency}/>
        <Calculate/>
        </Container>
      </main>
    </>
  );
}

export default App;
