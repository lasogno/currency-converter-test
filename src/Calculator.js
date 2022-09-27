import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import classNames from 'classnames';


function Calculate() {
  const [pair, setPair] = useState([0, 'USD', 'RUB']);
  const [result, setResult] = useState(0);
  const [state, setState] = useState('warning');
  const [sum, from, to] = pair;

  useEffect(() => {
    async function fetchData() {
      const validResponse = await fetch('https://pika-secret-ocean-49799.herokuapp.com/https://api.coingate.com/api/v2/currencies');
      const allCurrencies = await validResponse.json();
      const resFrom = allCurrencies.find(({ symbol }) => symbol === from);
      const resTo = allCurrencies.find(({ symbol }) => symbol === to);
      if (!resFrom || !resTo) {
        setResult(false);
        setState('danger')
      } else {
        const response = await fetch(`https://pika-secret-ocean-49799.herokuapp.com/https://api.coingate.com/v2/rates/merchant/${from}/${to}/`);
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
  }

  const classesForAlert = classNames('mt-5', {
    [`alert-${state}`]: true,
  })
    return (
      <Form onSubmit={handleSubmit}>
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
          <Alert className={classesForAlert}>{result? `Результат: ${Math.floor(result * 100) / 100}` : 'Ошибка - неверно указано название валюты'}</Alert>
        </div>
      </Form>
    );
  }
  
  export default Calculate;