import { getData } from "./api.js";
import { normalization } from "./utils.js";



// variables
let cachedProducts = null;

// selectores
let productList = document.querySelector('#product-list');
const modal = document.querySelector('#product-modal');
const btnClose = document.querySelector('#close-modal');
const modalImage = document.querySelector('#modal-image');
const modalTitle = document.querySelector('#modal-title');
const modalPrice = document.querySelector('#modal-price');
const modalDescription = document.querySelector('#modal-description');
const btnAddToCart = document.querySelector('#agregar-carrito');
const searchInput = document.querySelector('#search-input');

// Selectores del Carrito
const cartModal = document.querySelector('#cart-modal');
const btnCloseCartModal = document.querySelector('#close-cart-modal');
const btnOpenCartModal = document.querySelector('#cart-button');
const cartItemsContainer = document.querySelector('#cart-items-container');
const cartCounterEl = document.querySelector('#cart-counter');

export async function getProducts() {
    if (cachedProducts) return cachedProducts;
    console.log("Cargando productos desde la API...");
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


function renderProducts(products) {
    const template = products.map(p => `
        <div class="card" data-id="${p.id}">
            <div class="product">
                <img src="${p.images[0]}" alt="${p.title}" />
                <div class="product-info">
                    <h5>${p.title}</h5>
                    <p>Precio: $${p.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    `).join('');

    productList.innerHTML = template;
}

//funcion init 

async function init() {
    try {
        const products = await getProducts();
        renderProducts(products);
        searchproducts();
    } catch (err) {
        productList.innerHTML = `<p class="error">No se pudieron cargar los productos.</p>`;
    }
}

init();



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
        addToCart(productData, 1);
        modal.close();
    }
});

btnClose.addEventListener('click', () => {
    modal.close();
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
    
    updateCartUI(); // Actualizar UI después de agregar

    Swal.fire({
        title: '¡Producto agregado al carrito!',
        text: `Se agregó ${product.title} al carrito.`,
        icon: 'success',
        confirmButtonText: 'Cool'
    })

};

function updateCartUI() {
    let totalQuantity = 0;
    let html = '';

    cart.forEach(item => {
        totalQuantity += item.quantity;
        html += `
            <div style="display: flex; gap: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: contain; background: white; padding: 2px;">
                <div style="flex: 1; align-self: center;">
                    <h5 style="margin: 0; font-size: 14px;">${item.title}</h5>
                    <p style="margin: 5px 0 0 0; font-size: 13px; color: #555;">Cantidad: ${item.quantity}</p>
                </div>
            </div>
        `;
    });

    if (cart.length === 0) {
        html = '<p style="text-align: center; color: #777;">Tu carrito está vacío.</p>';
    }

    cartItemsContainer.innerHTML = html;
    cartCounterEl.textContent = totalQuantity;
}

// Inicializar el aspecto del carrito al cargar
updateCartUI();

btnOpenCartModal.addEventListener('click', () => {
    cartModal.showModal();
});

const closeCartModalWithAnimation = () => {
    cartModal.classList.add('closing');
    cartModal.addEventListener('animationend', function handler() {
        cartModal.classList.remove('closing');
        cartModal.close();
        cartModal.removeEventListener('animationend', handler);
    });
};

btnCloseCartModal.addEventListener('click', () => {
    closeCartModalWithAnimation();
});

// También cerramos con animación si el usuario presiona la tecla ESC
cartModal.addEventListener('cancel', (e) => {
    e.preventDefault(); // Evita que se cierre instantáneamente
    closeCartModalWithAnimation();
});

function searchproducts() {
  const listProducts = cachedProducts;
  if (!searchInput) return;

  function buscar (texto) {
      return listProducts.filter( p => 
          p.title.toLocaleLowerCase().includes(texto.toLocaleLowerCase()))
  }

  function mostrarResultado(encontrado) {
    let template = "";
    encontrado.forEach(p => {
        template+= `
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
  }

  searchInput.addEventListener("input", (e)=>{
      const texto = e.target.value;
      if(texto.length == 0) return mostrarResultado(cachedProducts);
      const encontrado= buscar(texto);
      mostrarResultado(encontrado); 
  });

}

