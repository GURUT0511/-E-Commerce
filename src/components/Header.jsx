import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <ShoppingBag size={28} />
          <span>LuxeCart</span>
        </Link>
        <div className="header-actions">
          {/* You can add cart icon or profile here later */}
        </div>
      </div>
    </header>
  );
}
