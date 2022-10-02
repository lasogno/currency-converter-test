import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function AvaliableCurrencies() {
    const [show, setShow] = useState(false);
    const [fiat, setFiat] = useState([]);
    const [crypto, setCrypto] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function getCurrenciesNames() {
            const validResponse = await fetch('https://pika-secret-ocean-49799.herokuapp.com/https://api.coingate.com/api/v2/currencies');

            const json = await validResponse.json();
            const allCurrencies = json.reduce((acc, {symbol, title, kind}) => {
                const currItem = [symbol, title, kind];
                acc.push(currItem);
                return acc;
            }, []);
            const crypto = allCurrencies.filter((curr) => curr[2] === 'crypto');
            setCrypto(crypto);
            const fiat = allCurrencies.filter((curr) => curr[2] === 'fiat');
            setFiat(fiat);
        }
        getCurrenciesNames();
    }, []);

    return (
        <>
            <Button variant="outline-primary"
                onClick={handleShow}>
                Посмотреть список всех валют
            </Button>

            <Offcanvas show={show}
                onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Доступные валюты:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h4>Обычные (фиатные) деньги</h4>
                    <ul>{
                        fiat.map(([code, title]) => <li key={code}>
                            {code}
                            - {title}</li>)
                    }</ul>
                    <hr></hr>
                    <h4>Криптовалюты</h4>
                    <ul>{
                        crypto.map(([code, title]) => <li key={code}>
                            {code}
                            - {title}</li>)
                    }</ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default AvaliableCurrencies;
