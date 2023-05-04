import React, { useState } from 'react';
import './App.css';

function Shop() {
  const [selectedIcon, setSelectedIcon] = useState('');

  const handleStarClick = () => {
    setSelectedIcon('star');
  };

  return (
    <div className="content">
      
      <div>
        <div className="product-card">
          <div className="product-tumb">
            <img src="/shop/star.jpg" alt="" onClick={handleStarClick} />
          </div>
          <div className="product-details">
            <span className="product-catagory">background-style</span>
            <h4><a href="">STAR</a></h4>
            <p>배경에 별을 넣어서 색다른 환경을 경험하세요!</p>
            <div className="product-bottom-details">
              <div className="product-price">2 Point</div>
            </div> 
          </div>
        </div>
        <div className="product-card">
          <div className="product-tumb">
            <img src="/shop/moon.jpg" alt=""/>
          </div>
          <div className="product-details">
            <span className="product-catagory">background-style</span>
            <h4><a href="">MOON</a></h4>
            <p>배경에 달을 넣어서 로맨틱한 분위기를 즐겨보세요!</p>
            <div className="product-bottom-details">
              <div className="product-price">3 Point</div>
            </div> 
          </div>
        </div>
      </div>
      
    </div>
  ); 
}

export default Shop;
