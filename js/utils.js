
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
