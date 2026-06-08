import React, { useEffect, useState } from "react";
import { getProducts } from "../services/ProductService";
import ProductCard from "../components/ProductCard";
import SkeletonGrid from "../components/SkeletonGrid";

function Home({ cart, setCart, wishlist, setWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <SkeletonGrid />
      ) : (
        <ProductCard
          products={products}
          cart={cart}
          setCart={setCart}
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
      )}
    </div>
  );
}

export default Home;