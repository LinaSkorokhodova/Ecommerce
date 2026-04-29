import React, { useState, useEffect } from 'react';
import Header from './Header'
import Content from './Content'; 
import Footer from './Footer';

const Container = () => {
  // Состояние текущей страницы.
  // Открывается витрина телевизоров ('tv').
  const [pageType, setPageType] = useState('tv');
   
  // При первом запуске берем корзину из памяти браузера
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem('techStoreCart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // При изменении корзины сохраняем ее в память
  useEffect(() => {
    sessionStorage.setItem(
      'techStoreCart',
      JSON.stringify(cart));
  }, [cart]);

    return (
    <div className="app-container">
      {/* Передаем вниз пропсы: */}
      <Header 
        pageType={pageType} 
        setPageType={setPageType} 
        cart={cart} 
      />

      <Content 
        pageType={pageType} 
        setPageType={setPageType} 
        cart={cart} 
        setCart={setCart} 
      />
      
      <Footer />
    </div>
  );
};

export default Container;