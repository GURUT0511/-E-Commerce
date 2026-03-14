import { useState, useEffect, useMemo } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';

export default function ProductList() {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load large enough initially avoiding pagination complexity for this demo
        const [prodRes, catRes] = await Promise.all([
          fetchProducts(100, 0),
          fetchCategories()
        ]);
        setAllProducts(prodRes.products);
        setCategories(catRes);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by text search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (category) {
      result = result.filter(p => p.category === category);
    }

    // Sort
    if (sortOption === 'price-asc') {
      result.sort((a, b) => {
        const pA = a.price - (a.price * (a.discountPercentage / 100));
        const pB = b.price - (b.price * (b.discountPercentage / 100));
        return pA - pB;
      });
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => {
        const pA = a.price - (a.price * (a.discountPercentage / 100));
        const pB = b.price - (b.price * (b.discountPercentage / 100));
        return pB - pA;
      });
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allProducts, searchQuery, category, sortOption]);

  if (loading) return <Loader />;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterBar 
          categories={categories}
          category={category}
          setCategory={setCategory}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          No products found matching your criteria.
        </div>
      ) : (
        <div className="product-grid">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
