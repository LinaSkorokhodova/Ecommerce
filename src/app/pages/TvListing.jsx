import { useState } from 'react'
import products from '../../data/products'
import ProductCard from '../components/ProductCard'
import './TvListing.css'

function TvListing({ cart, addToCart }) {
  // Состояние для фильтров (без функционала)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // 1. Вычисляем уникальные бренды из данных
  const uniqueBrands = [...new Set(products.map(p => p.make))]

  // 2. Товары только по категории TV (чтобы переменная tvProducts существовала)
  const tvProducts = products.filter(item => item.category === 'tv')

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
                <option value="" disabled hidden></option>

                {uniqueBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
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

            {/* Кнопка Apply (без функционала) */}
            <button className="apply-btn">Apply Filters</button>
          </aside>

          {/* 2. Баннер Special Deal (отдельный блок под фильтрами) */}
          <div className="special-deal-banner">
            <h4> Special Deal</h4>
            <p className="deal-timer">Offer expires in: <strong>0:59:59</strong></p>
          </div>

        </div>


        {/* Правая колонка: Товары */}
        <main className="content">
          <div className="products-header">
            <span className="products-count">{tvProducts.length} Products</span>
            <div className="sort-container">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select id="sort-select" className="sort-dropdown">
                <option value="">Price: High to Low</option>
                <option value="">Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {tvProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default TvListing