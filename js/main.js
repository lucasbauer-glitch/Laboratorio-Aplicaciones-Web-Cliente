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
        <div class="card">
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
