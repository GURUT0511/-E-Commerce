import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { ArrowLeft, ShoppingCart, Check, X } from 'lucide-react';
import Loader from '../components/Loader';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setActiveImage(data.thumbnail);
      } catch (err) {
        console.error("Error loading product details:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) loadProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div>Product not found</div>;

  const discountPrice = product.price 
    ? (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)
    : product.price;

  const inStock = product.stock > 0;

  return (
    <>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}
      >
        <ArrowLeft size={20} /> Back to Products
      </button>

      <div className="details-container">
        <div className="details-image-gallery">
          <div className="main-image">
            <img src={activeImage} alt={product.title} />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-row">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="details-info">
          <div className="details-brand">{product.brand || "Generic Brand"}</div>
          <h1>{product.title}</h1>
          
          <div className="details-price">
            ${discountPrice || product.price}
            {product.discountPercentage > 0 && (
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '1rem', fontWeight: 'normal' }}>
                ${product.price}
              </span>
            )}
          </div>

          <div className={`stock-status ${inStock ? 'stock-in' : 'stock-out'}`}>
            {inStock ? <><Check size={16} /> In Stock ({product.stock})</> : <><X size={16} /> Out of Stock</>}
          </div>

          <p className="details-desc">{product.description}</p>

          <button 
            className="add-btn" 
            style={{ width: '100%', padding: '1rem', justifyContent: 'center', fontSize: '1.125rem' }}
            disabled={!inStock}
          >
            <ShoppingCart size={20} />
            {inStock ? 'Add to Cart' : 'Currently Unavailable'}
          </button>

          <div className="meta-grid">
            <div className="meta-item">
              <span className="meta-label">Category</span>
              <span className="meta-value" style={{ textTransform: 'capitalize' }}>{product.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">SKU</span>
              <span className="meta-value">{product.sku || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Rating</span>
              <span className="meta-value">{product.rating} / 5.00</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Weight</span>
              <span className="meta-value">{product.weight ? `${product.weight}g` : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
