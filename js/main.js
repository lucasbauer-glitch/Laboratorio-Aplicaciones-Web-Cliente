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
const btnAddToCart = document.querySelector('#agregar-carrito');

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

        if (productData) {
            modal.dataset.currentId = productData.id;
            modal.showModal();
        }
    }
});

btnAddToCart.addEventListener('click', async () => {
    const productId = document.querySelector('#product-modal').dataset.currentId;

    const products = await getProducts();
    const productData = products.find(p => p.id == productId);

    if (productData) {
        addToCart(productData, currentQuantity);
        modal.close();
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

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const addToCart = (product, quantity) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`¡Agregaste ${quantity} unidad(es) de ${product.title} al carrito!`);
};