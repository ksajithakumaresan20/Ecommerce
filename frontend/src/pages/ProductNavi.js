import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  return (
    <div className="p-5 grid grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-3 shadow-sm"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img src={product.thumbnail} alt={product.title} />
          <h2>{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}