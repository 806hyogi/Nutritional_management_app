import React from 'react';
import './App.css';

function Shop({ selectedIcon, setSelectedIcon }) {
  const handleStarClick = () => {
    setSelectedIcon('star');
  };

  const handleMoonClick = () => {
    setSelectedIcon('moon');
  }

  return (
    <div className="content">
      {selectedIcon === 'star' && (
        <img src="/shop/starback.jpg" alt="starback" className="background-image" />
        
      )}
      {selectedIcon === 'moon' && (
        <img src="/shop/moonback.jpg" alt="moonback" className="background-image" />
        
      )}

      <div>
        <div className="product-card">
          <div className="product-tumb">
            <img src="/shop/star.jpg" alt="" onClick={handleStarClick} />
            
          </div>
          <div className="product-details">
            <span className="product-catagory">background-style</span>
            <h4><a>STAR</a></h4>
            <p>배경에 별을 넣어서 색다른 환경을 경험하세요!</p>
            <div className="product-bottom-details">
              <div className="product-price">2 Point</div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <div className="product-tumb">
            <img src="/shop/moon.jpg" alt="" onClick={handleMoonClick}/>
          </div>
          <div className="product-details">
            <span className="product-catagory">background-style</span>
            <h4><a>MOON</a></h4>
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
