import { useEffect, useState } from "react";
import { getProducts,getSingloroducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  console.log(products,"products");
  const[loading,setLoading]=useState(true);

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

  useEffect(() => {
    fetchsinglProducts();
  },[]);

  const fetchsinglProducts = async  (id) => {
    try{
      const data =await getSingloroducts(id);
      console.log(data,"SINGLE PRODUCT");
      console.log(`https://fackstoreapi.com/products/${id}`);
      setsinglproducts(data);
    }catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return <h2><LoaderIcon height="6em" /></h2>;
  }

  return (
    <div className="p-5 grid grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-3 shadow-sm"                             
        >
          return (
  <div>
    <ProductCard products={products} />
    onClick={() => showdetails(item)}
  </div>
);
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