import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import classNames from 'classnames';


function Calculate() {
  const [pair, setPair] = useState(['', '', '']);
  const [result, setResult] = useState(0);
  const [state, setState] = useState('warning');
  const [sum, from, to] = pair;

  useEffect(() => {
    async function fetchData() {
      if (!from || !to) {
        return;
      }
      const validResponse = await fetch('https://pika-secret-ocean-49799.herokuapp.com/https://api.coingate.com/api/v2/currencies')
      .catch(() => {
        setResult(false);
        setState('error');
       });
      
      const allCurrencies = await validResponse.json();
      const resFrom = allCurrencies.find(({ symbol }) => symbol === from);
      const resTo = allCurrencies.find(({ symbol }) => symbol === to);
      if (!resFrom || !resTo) {
        setResult(false);
        setState('danger');
      } else {
        const response = await fetch(`https://pika-secret-ocean-49799.herokuapp.com/https://api.coingate.com/v2/rates/merchant/${from}/${to}/`)
        .catch(() => {
          setResult(false);
          setState('error');
         });
        const json = await response.json();
        setResult(json * sum);
        setState('success');
      }
    }
    fetchData();
  }, [from, sum, to]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('calculator');
    const currencyPair = value.split(' ').filter((chunk, i) => i !== 2).join(' ').toUpperCase().split(' ');
    setPair(currencyPair);
    e.target.reset();
  };

  const classesForAlert = classNames('mt-5', {
    [`alert-${state}`]: true,
  });

  const resultField = () => {
    switch(state) {
      case 'success':
        return `Результат: ${15} ${from} = ${Math.floor(result * 1000) / 1000} ${to}`;
      case 'warning':
        return 'Введите значения валют';
      case 'danger':
        return 'Ошибка - неверно указано название валюты';
      case 'error':
        return 'Ошибка - нет подключения к сети';
      default:
        return `Unknown state - ${state}!`
    }
  };
    return (
      <Form onSubmit={handleSubmit} id="calculator" className='shadow p-5'>
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>Введите нужную сумму и валюту, в которую нужно перевести</Form.Label>
          <Form.Control type="text" name="calculator" placeholder="Пример: 15 usd in rub" required/>
          <Form.Text className="text-muted">
            Вводить нужно на английском языке
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div>
          <p className='mt-5'>{`Введенная сумма: ${sum} `}</p>
          <p className='mt-5'>{`Исходная валюта: ${from}`}</p>
          <p className='mt-5'>{`Валюту, в которую нужно конвертировать: ${to}`}</p>
          <Alert className={classesForAlert}>{resultField()}</Alert>
        </div>
      </Form>
    );
  }
  
  export default Calculate;