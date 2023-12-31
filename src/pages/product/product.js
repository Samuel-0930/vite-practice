import '/src/pages/product/product.css';
import {
  tiger,
  insertLast,
  getPbImageURL,
  comma,
  setStorage,
  getStorage,
} from '/src/lib';
import gsap from 'gsap';
import defaultAuthData from '/src/api/defaultAuthData';

if (!localStorage.getItem('auth')) {
  setStorage('auth', defaultAuthData);
}

async function renderProduct() {
  const response = await tiger.get(
    `${import.meta.env.VITE_PB_API}/collections/products/records`
  );

  const userData = response.data.items;

  const { isAuth } = await getStorage('auth');

  userData.forEach((item) => {
    const ratio = item.price * (item.discount * 0.01);
    const template = /* html */ `
    <li class="product-item">
      <a href="${
        !isAuth
          ? '/src/pages/login/'
          : `/src/pages/detail/index.html#${item.id}`
      }">
            <figure>
              <img src="${getPbImageURL(item)}" alt="" />
            </figure>
            <span class="brand">${item.brand}</span>
            <span class="desc"
              >${item.description}</span
            >
            <span class="price">${comma(item.price)}</span>
            <div>
              <span class="discount">${item.discount}%</span>
              <span class="real-price">${comma(item.price - ratio)}원</span>
            </div>
          </a>
        </li>
    `;

    insertLast('.container ul', template);
  });

  gsap.from('.product-item', {
    y: 30,
    opacity: 0,
    stagger: 0.05,
  });
}

renderProduct();
