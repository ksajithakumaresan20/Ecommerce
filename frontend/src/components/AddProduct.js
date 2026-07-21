import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state;

  const [editId, setEditId] = useState(null);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: "",
  });

  useEffect(() => {
    console.log("EDIT DATA =", editData);

    if (editData) {
      setProduct({
        title: editData.title || "",
        price: editData.price || "",
        category: editData.category || "",
        image: editData.image || "",
        description: editData.description || "",
        stock: editData.stock || "",
      });

      setEditId(editData.id);
    }
  }, [editData]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          product
        );

        alert("Product Updated Successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          product
        );

        alert("Product Added Successfully!");
      }

      setProduct({
        title: "",
        price: "",
        category: "",
        image: "",
        description: "",
        stock: "",
      });

      setEditId(null);
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  return (
    <div className="container mt-5">

      {/* Back Button */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/admin")}
      >
        ← Back
      </button>

      <h2>
        {editId ? "Update Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          className="form-control mb-3"
          value={product.title}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="form-control mb-3"
          value={product.price}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          className="form-control mb-3"
          value={product.category}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          className="form-control mb-3"
          value={product.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-3"
          value={product.description}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="form-control mb-3"
          value={product.stock}
          onChange={handleChange}
        />

        <button className="btn btn-success">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}