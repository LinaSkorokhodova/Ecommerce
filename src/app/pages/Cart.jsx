import React from 'react';
import products from '../../data/products';
import './Cart.css';

const Cart = ({ cart, setCart, setPageType }) => {
  const cartIds = Object.keys(cart);
  
  /* Если корзина пуста */
  if (cartIds.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => setPageType('tv')}>Continue Shopping</button>
      </div>
    );
  }

  let subtotal = 0;
  /* Формируем список товаров для отображения */
  const items = cartIds.map(id => {
    const product = products.find(p => p.id === Number(id));
    if (!product) return null;
    const qty = cart[id];
    subtotal += product.price * qty;
    return { ...product, qty };
  }).filter(Boolean);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  /* Логика изменения количества */
  const updateQty = (id, delta) => {
    setCart(prev => {
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
      
      {/* Список товаров */}
      <div className="cart-list">
        {items.map(item => (
          <div key={item.id} className="cart-row">
            <img src={item.images[0]} alt={item.model} className="thumb" />
            
            <div className="info">
              <div>{item.make} {item.model}</div>
              <div>${item.price.toLocaleString()}</div>
            </div>
            
            <div className="controls">
              <button onClick={() => updateQty(item.id, -1)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, 1)}>+</button>
              <button onClick={() => updateQty(item.id, -100)} className="trash">🗑</button>
            </div>
            
            <div className="row-total">
              ${(item.price * item.qty).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Сводка заказа */}
      <div className="summary">
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
        <div>Tax (8%): ${tax.toFixed(2)}</div>
        <div>Shipping: Calculated at checkout</div>
        <div className="grand-total">Total: ${total.toFixed(2)}</div>
        
        <div className="actions">
          <button onClick={() => setPageType('tv')}>Back to Shopping</button>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;