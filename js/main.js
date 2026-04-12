import { getData } from "./api.js";
import { normalization } from "./utils.js";

let cachedProducts = null;

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


let productList = document.querySelector('#product-list');
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

// Lógica del modal
const modal = document.querySelector('#product-modal');
const btnClose = document.querySelector('#close-modal');

const modalImage = document.querySelector('#modal-image');
const modalTitle = document.querySelector('#modal-title');
const modalPrice = document.querySelector('#modal-price');
const modalDescription = document.querySelector('#modal-description');

productList.addEventListener('click', async (event) => {
    const cardNode = event.target.closest('.card');
    if (!cardNode) return;

    const productId = cardNode.getAttribute('data-id');
    const products = await getProducts();
    const productData = products.find(p => p.id == productId);

    if (productData) {
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
