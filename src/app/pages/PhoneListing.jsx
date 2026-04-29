import { useState } from 'react';
import products from '../../data/products';
import ProductCard from '../components/ProductCard';
import { sortProducts } from '../utils/ProductSort';
import './PhoneListing.css';

function PhoneListing({ cart, addToCart, updateQuantity }) {
  /* черновики для ввода*/
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("5000");

  /* для примененных фильтров */
  const [activeBrand, setActiveBrand] = useState("");
  const [activeMinPrice, setActiveMinPrice] = useState("");
  const [activeMaxPrice, setActiveMaxPrice] = useState("5000");

  /* состояние для сортировки */
  const [sortType, setSortType] = useState("low-high");

  /* фильтрация по phone */
  const phoneProducts = products.filter((item) => item.category === "phone");
  const uniqueBrands = [...new Set(phoneProducts.map((p) => p.make))];

  /* применяем активные фильтры к списку */
  const filteredProducts = phoneProducts.filter((item) => {
    if (activeBrand && item.make !== activeBrand) return false;
    if (activeMinPrice !== "" && item.price < Number(activeMinPrice))
      return false;
    if (activeMaxPrice !== "" && item.price > Number(activeMaxPrice))
      return false;
    return true;
  });

  /* сортируем отфильтрованный список */
  const sortedProducts = sortProducts(filteredProducts, sortType);

  /* обработчик кнопки apply */
  const handleApplyFilters = () => {
    setActiveBrand(selectedBrand);
    setActiveMinPrice(minPrice);
    setActiveMaxPrice(maxPrice);
  };

  return (
    <div className="home-page">
      {/* Заголовок с логотипом и иконками */}

      <div className="page-layout">
        {/* 1. Структура левой колонки */}
        <div className="left-column">
          {/* Левая колонка: Фильтры */}
          <aside className="sidebar">
            <h3>Filters</h3>

            {/* Фильтр по бренду */}
            <div className="filter-group">
              <label htmlFor="brand">Brand</label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {/* 2. Пустая область выпадающего списка */}
                <option value="" disabled hidden>
                  Select Brand
                </option>

                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Фильтр по цене */}
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

            {/* Кнопка Apply */}
            <button className="apply-btn" onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </aside>

          {/* 2. Баннер Special Deal (отдельный блок под фильтрами) */}
          <div className="special-deal-banner">
            <h4> Special Deal</h4>
            <p className="deal-timer">
              Offer expires in: <strong>0:59:59</strong>
            </p>
          </div>
        </div>

        {/* Правая колонка: Товары */}
        <main className="content">
          <div className="products-header">
            <span className="products-count">
              {sortedProducts.length} Products
            </span>

            <div className="sort-container">
              <label htmlFor="sort-select" className="sort-label">
                Sort by:
              </label>
              <select
                id="sort-select"
                className="sort-dropdown"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {sortedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                addToCart={addToCart} // передаем функцию добавления
                quantityInCart={cart[item.id] || 0} // передаем текущее кол-во из глобальной корзины
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PhoneListing;
