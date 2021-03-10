'use strict';

const currency = document.getElementById('currency'),
      inValue = document.getElementById('inValue'),
      outValue = document.getElementById('outValue'),
      inMoney = document.getElementById('inMoney'),
      outMoney = document.getElementById('outMoney'),
      btnReverse = document.getElementById('btnReverse');

outValue.disabled = true;

const nameUSD = 'Доллар США (USD)',
      nameEUR = 'Евро (EUR)',
      nameRUB = 'Российский Рубль (RUB)';

const course = (data) => {
   let courseEUR = data.rates.EUR,
      courseUSD = data.rates.USD;


   const transform = () => {
      let z;
      if (inMoney.textContent === nameUSD) {
         z = courseUSD;
      } else if (inMoney.textContent === nameEUR) {
         z = courseEUR;
      } else if (inMoney.textContent === nameRUB) {
         if (outMoney.textContent === nameUSD) {
            z = 1 / courseUSD;
         } else {
            z = 1 / courseEUR;
         }
      }

      if (z) {
         outValue.value = Math.ceil((inValue.value / z) * 100) / 100;
      } else {
         outValue.value = inValue.value;
      }

   };

   inValue.addEventListener('input', transform);

   currency.addEventListener('change', () => {
      if (currency.value === 'usd') {
         inMoney.textContent = nameUSD;
         outMoney.textContent = nameRUB;
      } else if (currency.value === 'eur') {
         inMoney.textContent = nameEUR;
         outMoney.textContent = nameRUB;
      } else {
         inMoney.textContent = 'выбери валюту';
         outMoney.textContent = 'выбери валюту';
         inValue.value = 0;
      }

      transform();
   });

   btnReverse.addEventListener('click', () => {
      let tmp = inMoney.textContent;
      inMoney.textContent = outMoney.textContent;
      outMoney.textContent = tmp;

      transform();
   });

};


fetch('https://api.exchangeratesapi.io/latest?base=RUB&symbols=USD,EUR')
   .then((response) => {
      if (response.status !== 200) {
         throw new Error('status network not 200');
      }
      return (response.json());
   })
   .then((data) => {
      course(data);
   })
   .catch((error) => console.error(error));

