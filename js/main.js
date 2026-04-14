import { getData } from "./api.js";
import { normalization } from "./utils.js";

// variables
let cachedProducts = null;
let currentQuantity = 1;

// selectores
let productList = document.querySelector('#product-list');
const modal = document.querySelector('#product-modal');
const btnClose = document.querySelector('#close-modal');
const modalImage = document.querySelector('#modal-image');
const modalTitle = document.querySelector('#modal-title');
const modalPrice = document.querySelector('#modal-price');
const modalDescription = document.querySelector('#modal-description');

const btnIncrease = document.querySelector('#increase-btn');
const btnDecrease = document.querySelector('#decrease-btn');
const quantityValue = document.querySelector('#quantity-value');

const updateQuantityDisplay = () => {
    quantityValue.textContent = currentQuantity;
};

export async function getProducts() {
  if (cachedProducts) return cachedProducts;

  try {
    const response = await getData();
    cachedProducts = await normalization(response);
    console.log("Productos normalizados:", cachedProducts);
    return cachedProducts;
  } catch (err) {
    console.error("Error cargando productos:", err);
    throw err;
  }
}

getProducts().then(products => {
    let template = '';
    products.forEach(p => {
        template += `
        <div class="card" data-id="${p.id}">
              <div class="product">
                  <img src="${p.images[0]}" alt="${p.title}" />
                  <div class="product-info">
                      <h5>${p.title}</h5>
                      <p>Precio: $${p.price.toFixed(2)}</p>
                  </div>
              </div>
        </div>
        `;
    })
    productList.innerHTML = template;
  })

productList.addEventListener('click', async (event) => {
    const cardNode = event.target.closest('.card');
    if (!cardNode) return;

    const productId = cardNode.getAttribute('data-id');
    const products = await getProducts();
    const productData = products.find(p => p.id == productId);

    if (productData) {
        currentQuantity = 1;
        updateQuantityDisplay();

        modalImage.src = productData.images[0];
        modalTitle.textContent = productData.title;
        modalPrice.textContent = `Precio: $${productData.price.toFixed(2)}`;
        modalDescription.textContent = productData.description;

        modal.showModal();
    }
});

btnClose.addEventListener('click', () => {
    modal.close();
});

btnIncrease.addEventListener('click', () => {
    currentQuantity++;
    updateQuantityDisplay();
});

btnDecrease.addEventListener('click', () => {
    if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplay();
    }
});