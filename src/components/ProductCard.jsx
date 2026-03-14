import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  const discountPrice = product.price 
    ? (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)
    : product.price;

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        {product.discountPercentage > 0 && (
          <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
        )}
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title" title={product.title}>{product.title}</h3>
        
        <div className="product-rating">
          <Star size={16} fill="#f59e0b" color="#f59e0b" />
          <span>{product.rating}</span>
        </div>

        <div className="product-price-row">
          <span className="price">${discountPrice || product.price}</span>
          <button 
            className="add-btn" 
            onClick={(e) => {
              e.preventDefault();
              // Prevent navigation to details page if add to cart is clicked
            }}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}
