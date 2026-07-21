import ProductList from '../data/ProductList';
import ProductCard from '../components/ProductCard';

export default function Dashboard() {
  return (
    <div className='d-flex flex-wrap'>
      {ProductList.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}