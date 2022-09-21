import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Calculate() {
    return (
      <Form onSubmit={console.log('boo')}>
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>Введите нужную сумму и валюту, в которую нужно перевести</Form.Label>
          <Form.Control type="text" placeholder="Пример: 15 usd in rub"/>
          <Form.Text className="text-muted">
            Вводить нужно на английском языке
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
  
  export default Calculate;