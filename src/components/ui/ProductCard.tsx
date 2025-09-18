import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-3 aspect-h-2 w-full">
        <img
          src={product.image.url || '/api/placeholder/400/300'}
          alt={product.image.alt || product.name}
          className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-amber-900 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            {product.category}
          </span>
        </div>
        <p className="text-amber-700 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-600">
            ${product.price.toFixed(2)}
          </span>
          <button className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;