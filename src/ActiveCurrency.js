import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function ActiveCurrency({ value, changeBaseCurrency }) {
    return (
      <div className='shadow p-5'>
        <p>{`Выбранная основная валюта - ${value}`}</p> 
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
      </div>
    );
};

export default ActiveCurrency;