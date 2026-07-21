import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product Deleted Successfully!");
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    navigate("/add-product", {
      state: item,
    });
  };

  return (
    <div className="container mt-5">

  <button
    className="btn btn-secondary mb-3"
    onClick={() => navigate("/admin")}
  >
    ← Back
  </button>
      <h2>Manage Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((item) => (
          <div
            key={item.id}
            className="card p-3 mb-3"
          >
            <div className="row align-items-center">
              <div className="col-md-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid"
                  style={{
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="col-md-7">
                <h5>{item.title}</h5>

                <p>
                  <strong>Price:</strong> ₹{item.price}
                </p>

                <p>
                  <strong>Category:</strong> {item.category}
                </p>

                <p>
                  <strong>Stock:</strong> {item.stock}
                </p>
              </div>

              <div className="col-md-3">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDelete(item.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
