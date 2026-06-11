import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getsingleproduct } from "../services/ProductService";
import LoadingTwotoneLoopIcon from "@iconify-react/line-md/loading-twotone-loop";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
  fetchProduct();
}, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getsingleproduct(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 Loading Icon
  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <LoadingTwotoneLoopIcon height="80" />
      </div>
    );
  }

  return (
    <div className="container mt-5">

      {/* Back Button */}
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row align-items-center">

        {/* Product Image */}
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "450px",
              objectFit: "contain",
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
              lineHeight: "1.8",
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