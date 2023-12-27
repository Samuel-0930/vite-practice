import '/src/pages/product/product.css';
import { tiger, insertLast } from '/src/lib';

async function renderProduct() {
  const response = await tiger.get(
    'http://127.0.0.1:8090/api/collections/cards/records'
  );

  const datas = response.data.items;

  datas.forEach((item) => {
    const template = /* html */ `
    <div>
      <span>Name : ${item.name}<br></span>
      <span>Message : ${item.message}<br></span>
    </div>
    `;

    insertLast('.container', template);
  });
}

renderProduct();
