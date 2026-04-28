import { useState } from "react";
import products from "../../data/products";
import ProductCard from "../components/ProductCard";
import "./LaptopListing.css";

function LaptopListing({ cart, addToCart, updateQuantity }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("5000");

  const laptopProducts = products.filter((item) => item.category === "laptop");
  const uniqueBrands = [...new Set(laptopProducts.map((p) => p.make))];

  return (
    <div className="home-page">
      <div className="page-layout">
        <div className="left-column">
          <aside className="sidebar">
            <h3>Filters</h3>
            <div className="filter-group">
              <label>Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-inputs">
                <input
                  type="text"
                  placeholder="$0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="$5,000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <button className="apply-btn">Apply Filters</button>
          </aside>

          <div className="special-deal-banner">
            <h4>🔥 Special Deal</h4>
            <p className="deal-timer">
              Offer expires in: <strong>0:59:59</strong>
            </p>
          </div>
        </div>

        <main className="content">
          <div className="products-header">
            <span className="products-count">
              {laptopProducts.length} Products{" "}
            </span>
          </div>
          <div className="product-grid">
            {laptopProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                addToCart={addToCart}
                quantityInCart={cart[item.id] || 0}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default LaptopListing;
