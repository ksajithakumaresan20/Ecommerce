import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getsingleproduct } from "../services/ProductService";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const data = await getsingleproduct(id);
    setProduct(data);
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <img src={product.image} width="200" />
      <h2>{product.title}</h2>
      <p>₹{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetail;