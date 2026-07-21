import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Get All Products
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

// Get Single Product
export const getsingleproduct = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};            