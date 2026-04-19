import './Header.css'

function Header() {
  return (
    <header className="header">
      {/* ЛЕВАЯ ЧАСТЬ: Логотип и навигация */}
      <div className="header-left">
        <h1 className="logo">TechStore</h1>
        <nav className="header-nav">
          <a href="/tv" className="nav-link">TV</a>
          <a href="/phone" className="nav-link">Phone</a>
          <a href="/laptop" className="nav-link">Laptop</a>
        </nav>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Иконки */}
      <div className="header-right">
        <button className="icon-btn">🛒</button>
        <button className="icon-btn">👤</button>
      </div>
    </header>
  )
}

export default Header