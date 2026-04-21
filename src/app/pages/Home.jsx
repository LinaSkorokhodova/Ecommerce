import { useState } from 'react'
import Header from '../components/Header'
import products from '../../data/products'
import './Home.css'

function Home() {
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
      <Header />

      <div className="page-layout">

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

        {/* Правая колонка: Товары */}
        <main className="content">
          <div className="product-summary">
            <h2>{tvProducts.length} Products</h2>
          </div>

          <div className="product-grid">
            {tvProducts.map(item => (
              <div key={item.id} className="product-card">
                
                {/* Название бренда */}
                <p className="product-brand">{item.make}</p>

                {/* Модель */}
                <p className="product-model">{item.model}</p>

                {/* Цена */}
                <p className="product-price">${item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home