import React from 'react';
import TvListing from '../pages/TvListing';
import PhoneListing from '../pages/PhoneListing';
import LaptopListing from '../pages/LaptopListing';
import Cart from '../pages/Cart';

const Content = ({ pageType, setPageType, cart, setCart }) => {

  // добавляем товар
  function handleAddToCart(productId) {
    // берем текущую корзину
    const newCart = { ...cart };

    // смотрим, сколько такого товара уже есть (если его нет - тогда 0)
    const currentCount = newCart[productId] || 0;

    // увеличиваем на 1
    newCart[productId] = currentCount + 1;

    // сохраняем новую корзину
    setCart(newCart);
  }

  // функция для изменения количества (с помощью + или -)
  function handleUpdateQuantity(productId, delta) {
    // берем текущую корзину
    const newCart = { ...cart };

    // текущее количество
    const currentCount = newCart[productId] || 0;

    // новое количество (+ или -)
    const newCount = currentCount + delta;

    // Если стало равно нулю или меньше, удаляем товар совсем
    if (newCount <= 0) {
      delete newCart[productId];
    } else {
      // иначе обновляем число
      newCart[productId] = newCount;
    }

    // сохраняем
    setCart(newCart);
  }

  //      -- Рендер страниц --

  return (
    <>
      {/* Если открыта страница TV */}
      {pageType === 'tv' && (
        <TvListing
          cart={cart}
          addToCart={handleAddToCart}
          updateQuantity={handleUpdateQuantity}
          setPageType={setPageType}
        />
      )}


      {pageType === 'phone' && <PhoneListing cart={cart} setCart={setCart} />}
      {pageType === 'laptop' && <LaptopListing cart={cart} setCart={setCart} />}
      {pageType === 'cart' && <Cart cart={cart} setCart={setCart} setPageType={setPageType} />}
    </>
  );
};

export default Content;