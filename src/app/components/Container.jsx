import React, { useState } from 'react';
import Header from './Header'
import Content from './Content'; 
import Footer from './Footer';

const Container = () => {
  // 1. Состояние текущей страницы.
  // Открывается витрина телевизоров ('tv').
  const [pageType, setPageType] = useState('tv');

   
   // 2. Состояние корзины.
   // Храним как объект: { productId: quantity }.
  // Пустой объект {} означает пустую корзину.
  const [cart, setCart] = useState({});

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