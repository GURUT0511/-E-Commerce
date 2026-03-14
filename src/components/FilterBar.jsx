export default function FilterBar({ 
  categories, 
  category, 
  setCategory, 
  sortOption, 
  setSortOption 
}) {
  return (
    <div className="filter-bar">
      <select 
        className="filter-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug || cat} value={cat.slug || cat}>
            {cat.name || cat}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  );
}
