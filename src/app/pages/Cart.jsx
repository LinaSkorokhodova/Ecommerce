import React from "react";
import products from "../../data/products";
import "./Cart.css";

const Cart = ({ cart, setCart, setPageType }) => {
  const cartIds = Object.keys(cart);

  /* Если корзина пуста */
  if (cartIds.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button
          className="continue-shopping-btn"
          onClick={() => setPageType("tv")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  let subtotal = 0;
  /* Формируем список товаров для отображения */
  const items = cartIds
    .map((id) => {
      const product = products.find((p) => p.id === Number(id));
      if (!product) return null;
      const qty = cart[id];
      subtotal += product.price * qty;
      return { ...product, qty };
    })
    .filter(Boolean);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  /* Логика изменения количества */
  const updateQty = (id, delta) => {
    setCart((prev) => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {/* Обертка для двух колонок */}
      <div className="cart-container">
        {/* Список товаров */}
        <div className="cart-list">
          {items.map((item) => (
            <div key={item.id} className="cart-row">
              {/* Левая часть (картинка, название, кнопки) */}
              <div className="product-left">
                <img src={item.images[0]} alt={item.model} className="thumb" />

                <div className="product-info">
                  <div className="product-brand">{item.make}</div>
                  <div className="product-model">{item.model}</div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>

              {/* Корзина + Цена за товар */}
              <div className="product-right">
                <button
                  onClick={() => updateQty(item.id, -100)}
                  className="trash-btn"
                  aria-label="Remove item"
                >
                  🗑️
                </button>

                <div className="row-total">
                  ${(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row grand-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-actions">
            <button className="btn-primary">Proceed to Checkout</button>
            <button className="btn-secondary" onClick={() => setPageType("tv")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
