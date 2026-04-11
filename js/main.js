import { getData } from "./api.js";

export async function normalization(response) {
  try {
    return response.products.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      brand: product.brand,
      category: product.category,
      images: product.images,
    }));
    
  } catch (error) {
    console.error("Error al normalizar los productos:", error);
    return [];
  }
}

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

getProducts();