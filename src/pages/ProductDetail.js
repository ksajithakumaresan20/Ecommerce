import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getsingleproduct } from "../services/ProductService";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const data = await getsingleproduct(id);
    setProduct(data);
  };

  if (!product) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        {/* Product Image */}
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "450px",
              objectFit: "contain"
            }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-7">
          <h2 className="mb-3">{product.title}</h2>

          <h3 className="text-success mb-3">
            ₹{product.price}
          </h3>

          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.8"
            }}
          >
            {product.description}
          </p>

          <button
            className="btn btn-warning btn-lg mt-3"
            onClick={() => addToCart(product)}
          >
            🛒 Add To Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;