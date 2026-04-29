import './Header.css'

function Header({ pageType, setPageType, cart }) {
  // Если cart нет, считаем его пустым объектом {}
  const safeCart = cart || {};

  {/* Вычисляем общее количество товаров для бейджа */ }
  const totalItems = Object.values(safeCart).reduce((sum, count) => sum + count, 0);

  return (
    <header className="header">
      {/* Левая часть: Логотип и навигация */}
      <div className="header-left">
        {/* Логотип кликабелйный */}
        <h1
          className="logo"
          onClick={() => setPageType('tv')}
          style={{ cursor: 'pointer' }}
        >
          TechStore
        </h1>

        <nav className="header-nav">
          <button
            className={`nav-link ${pageType === 'tv' ? 'active' : ''}`}
            onClick={() => setPageType('tv')}
          >
            TV
          </button>

          <button
            className={`nav-link ${pageType === 'phone' ? 'active' : ''}`}
            onClick={() => setPageType('phone')}
          >
            Phone
          </button>

          <button
            className={`nav-link ${pageType === 'laptop' ? 'active' : ''}`}
            onClick={() => setPageType('laptop')}
          >
            Laptop
          </button>
        </nav>
      </div>

      {/* Правая часть: Иконки */}
      <div className="header-right">
        {/* Кнопка корзины кликабельна (переход на страницу корзины) */}
        <button className="icon-btn"
          onClick={() => setPageType('cart')}
        >🛒
          {/* Показывает цифру только если товаров больше 0 */}
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>

        <button className="icon-btn">👤</button>
      </div>
    </header>
  )
}

export default Header