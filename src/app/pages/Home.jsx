import Header from '../components/Header'
import products from '../../data/products'
import './Home.css'

function Home() {
  const tvProducts = products.filter(item => item.category === 'tv')

  return (
    <div className="home-page">
      {/* 1. Заголовок */}
      <Header />
      
      {/* Основной контейнер */}
      <div className="page-layout">
        
        {/* Левая колонка: Фильтры */}
        <aside className="sidebar">
          <h3>Filters</h3>
          { }
        </aside>
        
        {/* Правая колонка: Товары */}
        <main className="content">
          
          {/* Счётчик товаров */}
          <div className="product-summary">
            <h2>{tvProducts.length} Products</h2>
            { }
          </div>

          {/* Сетка карточек */}
          <div className="product-grid">
            {tvProducts.map(item => (
              <div key={item.id} className="card-placeholder">
                {}
                <p>ID: {item.id}</p>
                <p>{item.make} {item.model}</p>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}

export default Home