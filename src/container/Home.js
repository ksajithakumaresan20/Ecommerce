import React, { useState ,useEffect} from "react";
import Header from '../components/Header';

import ProductCard from '../components/ProductCard';
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/ProductService";
// import LoaderIcon from "@iconify-react/codex/loader";

function Home({ cart, setCart }) {
  const [loading,setLoading]=useState(false);
  const [products,setProducts]=useState([]);
  const navigate = useNavigate();
  console.log(products,"products state");
  console.log(loading,"loading state");


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await getProducts();
        console.log(products, "fetched products");
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const handleLogout =() => {
      localStorage.removeItem("token");
      console.log("REMOVE");
      navigate("/");
  };
 

  return (

    <div>

      {/* HEADER */}

      <Header handleLogout={handleLogout} />

      {/* CART BUTTON */}


      {/* PRODUCT CARD */}

      <ProductCard
        products={products}
        cart={cart}
        setCart={setCart}
      />

    </div>
  );
}

export default Home;