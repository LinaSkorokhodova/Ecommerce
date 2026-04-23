import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Колонка 1: About */}
        <div className="footer-column">
          <h4>About TechStore</h4>
          <p>
            TechStore —  надежный магазин электроники. 
            Мы предлагаем широкий выбор техники от ведущих брендов с гарантией качества и быстрой доставкой.
          </p>
        </div>

        {/* Колонка 2: Support */}
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/shipping">Shipping</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/contact">Contact </a></li>
          </ul>
        </div>

         {/* Колонка 3: Legal */}
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        {/* Колонка 4: Newsletter */}
        <div className="footer-column">
          <h4>Newsletter</h4>
          <p>Subscribe to get special offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        </div>
      
      {/* © 2026 TechStore. All rights reserved. */}
      <div className="footer-bottom">
        <p>&copy; 2026 TechStore. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer