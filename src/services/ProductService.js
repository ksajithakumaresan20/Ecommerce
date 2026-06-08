import axios from "axios";

const API_URL = "https://fakestoreapi.com";

// ALL PRODUCTS
export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};

// SINGLE PRODUCT
export const getsingleproduct = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};