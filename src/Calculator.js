import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AvaliableCurrencies from './AvaliableCurrencies';
import { Typeahead } from 'react-bootstrap-typeahead'; 
import classNames from 'classnames';


function Calculate() {
  const [result, setResult] = useState(0);
  const [state, setState] = useState('info');
  const [fromSelect, setFromCurrency] = useState('');
  const [toSelect, setToCurrency] = useState('');
  const [sum, setSum] = useState('');
  const [currencies, setAllCurrencies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const from = fromSelect.toString();
      const to = toSelect.toString();
      if (!from || !to) {
        return;
      }
      const resFrom = currencies.find((elem) => elem === from);
      const resTo = currencies.find((elem) => elem === to);
      if (!resFrom || !resTo) {
        setState('danger');
      } else {
        const response = await fetch(`https://pika-secret-ocean-49799.herokuapp.com/https://api.coingate.com/v2/rates/merchant/${from}/${to}/`)
        .catch(() => {
          setState('warning');
         });
        const json = await response.json();
        setResult(json * sum);
        setState('success');
      }
    }
    fetchData();
  }, [fromSelect, sum, toSelect]);

  useEffect(() => {
    async function getCurrenciesNames() {
      const validResponse = await fetch('https://pika-secret-ocean-49799.herokuapp.com/https://api.coingate.com/api/v2/currencies')
      .catch(() => {
        setState('warning');
       });
      
      const json = await validResponse.json();
      const allCurrencies = json.map(({ symbol }) => symbol);
      setAllCurrencies(allCurrencies);
    }
    getCurrenciesNames();
  }, []);

  const classesForAlert = classNames('mt-5', {
    [`alert-${state}`]: true,
  });

  const resultField = () => {
    switch(state) {
      case 'success':
        return `Результат: ${sum} ${fromSelect.toString()} = ${Math.floor(result * 1000) / 1000} ${toSelect.toString()}`;
      case 'info':
        return 'Введите значения валют';
      case 'danger':
        return 'Ошибка - неверно указано название валюты';
      case 'warning':
        return 'Ошибка - нет подключения к сети';
      default:
        return `Unknown state - ${state}!`
    }
  };
    return (
      <>
      <AvaliableCurrencies/>
      <Form  id="calculator" className='shadow p-5'>
        <Form.Group className="mb-3" controlId="formBasicFrom">
          <Form.Label>Исходная валюта</Form.Label>
          <Typeahead
          id="basic-typeahead-from"
          labelKey="name"
          onChange={setFromCurrency}
          options={currencies}
          placeholder="Выберите исходную валюту..."
          style={{ margin: 0 }}
        />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTo">
        <Form.Label>Валюта, в которую нужно перевести</Form.Label>
        <Typeahead
          id="basic-typeahead-to"
          labelKey="name"
          onChange={setToCurrency}
          options={currencies}
          placeholder="Выберите валюту, в которую нужно перевести..."
          style={{ margin: 0 }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSum">
        <Form.Label>Сумма</Form.Label>
        <Form.Control type="number" placeholder="Сумма" onChange={(e) => setSum(e.target.value)}/>
      </Form.Group>
          <Alert className={classesForAlert}>{resultField()}</Alert>
      </Form>
      </>
    );
  }
  
  export default Calculate;