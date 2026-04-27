import React from 'react';
import TvListing from '../pages/TvListing'; 
import PhoneListing from '../pages/PhoneListing';
import LaptopListing from '../pages/LaptopListing';
import Cart from '../pages/Cart';


const Content = ({ pageType, setPageType, cart, setCart }) => {
  return (
    <>
      {pageType === 'tv' && <TvListing cart={cart} setCart={setCart} />}
      {pageType === 'phone' && <PhoneListing cart={cart} setCart={setCart} />}
      {pageType === 'laptop' && <LaptopListing cart={cart} setCart={setCart} />}
      {pageType === 'cart' && <Cart cart={cart} setCart={setCart} setPageType={setPageType} />}
    </>
  );
};

export default Content;