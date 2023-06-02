import React from 'react';
import './App.css';


function Shop({ selectedIcon, setSelectedIcon, experience, setExperience }) {
  const handleStarClick = () => {
    if (selectedIcon !== 'star' && selectedIcon !== 'moon') {
      const newExperience = experience - 10;
      if (newExperience >= 0) {
        setSelectedIcon('star');
        setExperience(newExperience);
      } else {
        alert('경험치가 부족하여 구매할 수 없습니다.');
      }
    }
  };
  
  const handleMoonClick = () => {
    if (selectedIcon !== 'star' && selectedIcon !== 'moon') {
      const newExperience = experience - 20;
      if (newExperience >= 0) {
        setSelectedIcon('moon');
        setExperience(newExperience);
      } else {
        alert('경험치가 부족하여 구매할 수 없습니다.');
      }
    }
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
            <h4><a>STAR</a></h4>
            <p>배경에 별을 넣어서 색다른 환경을 경험하세요!</p>
            <div className="product-bottom-details">
              <div className="product-price">10 Point</div>
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
              <div className="product-price">20 Point</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
