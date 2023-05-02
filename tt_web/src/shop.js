import React from 'react';
import './App.css';

function Shop() {
  return (
    <div className="content">
      <div>
        <div class="product-card">
          <div class="product-tumb">
            <img src="/shop/star.jpg" alt=""/>
          </div>
          <div class="product-details">
            <span class="product-catagory">background-style</span>
            <h4><a href="">STAR</a></h4>
            <p>배경에 별을 넣어서 색다른 환경을 경험하세요!</p>
            <div class="product-bottom-details">
              <div class="product-price">2 Point</div>
            </div> 
          </div>
        </div>
        <div class="product-card">
          <div class="product-tumb">
            <img src="/shop/moon.jpg" alt=""/>
          </div>
          <div class="product-details">
            <span class="product-catagory">background-style</span>
            <h4><a href="">MOON</a></h4>
            <p>배경에 달을 넣어서 로맨틱한 분위기를 즐겨보세요!</p>
            <div class="product-bottom-details">
              <div class="product-price">3 Point</div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Shop;
