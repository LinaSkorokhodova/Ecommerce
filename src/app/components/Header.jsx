import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        
        <a href="/tv" className="header__logo">TechStore</a>

        <nav className="header__nav">
          <button className="tab tab--active">TV</button>
          <button className="tab">Phone</button>
          <button className="tab">Laptop</button>
        </nav>

        <div className="header__actions">
          {/* Иконка корзины - SVG прямо здесь */}
          <button className="icon-btn" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>

          {/* Иконка пользователя - SVG прямо здесь */}
          <button className="icon-btn" aria-label="User">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>

      </div>
    </header>
  )
}

export default Header