import React from "react";
import { useState, useEffect } from "react";

const ShowCourses = ({ value }) => {
  const currencies = ["USD", "EUR", "RUB"];
  const filtered = currencies.filter((curr) => curr !== value);
  const [one, two] = filtered;

  const [firstResult, setFirst] = useState('');
  const [secondResult, setSecond] = useState('')
  useEffect(() => {
    async function fetchData() {
      const firstResponse = await fetch(
        `https://pika-secret-ocean-49799.herokuapp.com/https://api.coingate.com/v2/rates/merchant/${one}/${value}/`
      );
      const firstJson = await firstResponse.json();
      setFirst(firstJson);

      const secondResponse = await fetch(
        `https://pika-secret-ocean-49799.herokuapp.com/https://api.coingate.com/v2/rates/merchant/${two}/${value}/`
      );
      const secondJson = await secondResponse.json();
      setSecond(secondJson);

    }
    fetchData();
  }, [one, two, value]);
  return (
    <div id="currency-course" className='shadow p-3'>
        <p>Курсы валют:</p>
      <p>
        1 {one} = {firstResult} {value}
      </p>
      <p>
        1 {two} = {secondResult} {value}
      </p>
    </div>
  );
};

export default ShowCourses;
