import Container from 'react-bootstrap/Container';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Calculate from './Calculator';

function ActiveCurrency({ value, changeBaseCurrency }) {
    return (
      <>
      <Container className='main__container'>
        {`Выбранная валюта - ${value}`}
        <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Выбрать валюту
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeBaseCurrency('RUB')}>RUB</Dropdown.Item>
        <Dropdown.Item onClick={() => changeBaseCurrency('USD')}>USD</Dropdown.Item>
        <Dropdown.Item onClick={() => changeBaseCurrency('EUR')}>EUR</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </Container>
      <Container className='main__calculator'>
      <Calculate></Calculate>
      </Container>
      </>
    );
};

export default ActiveCurrency;