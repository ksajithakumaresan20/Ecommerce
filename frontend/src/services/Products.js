import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-5 grid grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-xl p-3 shadow-sm">

          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-cover rounded-lg"
          />

          <h2 className="mt-2 font-semibold">
            {product.title}
          </h2>

          <p className="text-sm text-gray-500">
            ${product.price}
          </p>

        </div>
      ))}
    </div>
  );
}

export default Products;