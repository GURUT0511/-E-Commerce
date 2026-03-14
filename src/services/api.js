export const fetchProducts = async (limit = 30, skip = 0) => {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product details");
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch("https://dummyjson.com/products/categories");
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const searchProducts = async (query) => {
  const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  if (!response.ok) throw new Error("Failed to search products");
  return response.json();
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`https://dummyjson.com/products/category/${category}`);
  if (!response.ok) throw new Error("Failed to fetch category products");
  return response.json();
};
