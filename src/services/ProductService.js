import axios from "axios";
const BASE_URL="https:/dummyjson.com";

const API_URL = "https://fakestoreapi.com";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getsingleproduct = async (id) =>{
  try{
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  }catch (error) {
    console.error("Error fetching product details:",error);
    throw error;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, payload);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};