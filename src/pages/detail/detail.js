import '/src/pages/detail/detail.css';
import { insertLast, comma, getPbImageURL } from '/src/lib/';
import pb from '/src/api/pocketbase';

async function renderProductData() {
  const hash = window.location.hash.slice(1);

  // getOne()은 아이디로 검색이 가능하다
  const productData = await pb.collection('products').getOne(hash);
  const ratio = productData.price * (productData.discount * 0.01);
  console.log(productData);

  const template = /* html */ `
  <div class="wrapper">
        <div class="brand">
          <label for="brand">브랜드</label>
          <input type="text" value="${productData.brand}" id="brand" />
        </div>
        <div class="visual">
          <img src="${getPbImageURL(productData)}" alt="" />
        </div>
        <div class="desc">
          <label for="description">상품 제목</label>
          <input
            type="text"
            value="${productData.description}"
            id="description"
          />
        </div>
        <div class="price">
          <label for="price">가격</label>
          <input type="text" value="${comma(productData.price)}" id="price" />
        </div>
        <div class="discount">
          <label for="discount">할인율(%)</label>
          <input type="text" value="${productData.discount}" id="discount" />
        </div>

        <div class="real-price">${comma(productData.price - ratio)}</div>
      </div>

      <div class="buttonGroup">
        <button class="cancel" type="button">취소</button>
        <button class="modify" type="button">수정</button>
      </div>
  `;
  insertLast('.container', template);
}

renderProductData();
