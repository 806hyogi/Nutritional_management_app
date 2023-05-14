import React, { useState, useEffect } from 'react';
import './App.css';

import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Capsule from './capsule.js';
import Community from './community.js';
import Ranking from './ranking.js';
import Search from './search.js';
import Shop from './shop.js';
import Person from './person.js';

function App() {
  const [selectedIcon, setSelectedIcon] = useState('');
  const [experience, setExperience] = useState(0);
  const [experienceBarWidth, setExperienceBarWidth] = useState(0);

  const handleIconClick = (iconName) => {
    if (selectedIcon !== 'star' && selectedIcon !== 'moon') {
      setSelectedIcon(iconName);
    }
  };

  const getBackgroundImage = () => {
    if (selectedIcon === 'star') {
      return '/shop/starback.jpg';
    } else if (selectedIcon === 'moon') {
      return '/shop/moonback.jpg';
    } else {
      return null;
    }
  };

  const handleExperienceChange = (newExperience) => {
    // 경험치 값이 0 미만이면 0으로 설정합니다.(음수가 되지 못하게 함)
    const adjustedExperience = Math.max(0, newExperience);
    setExperience(adjustedExperience);
  };

  // 임시로 경험치 초기값 변경해주는 코드
  useEffect(() => {
    handleExperienceChange(experience - 200);
  }, []);
  
  // 경험치에 따라 이미지를 변경해주는 코드
  const getForegroundImage = () => {
    if (experience >= 0 && experience < 80) {
      return '/egg/egg1.gif';
    } else if (experience >= 80 && experience < 150) {
      return '/egg/egg2.gif';
    } else if (experience >= 150 && experience < 200) {
      return '/egg/egg3.gif';
    } else if (experience >= 200 && experience < 255) {
      return '/egg/egg4.gif';
    } else if (experience >= 255) {
      return '/egg/egg4.gif';
    } else {
      return null;
    }
  };

  // 경험치에 따라 경험치 바의 배경색을 유동적으로 설정하는 함수
  const getExperienceBarColor = () => {
    const progress = (experience / 255) * 100; // 경험치 진행 상태를 계산합니다.
  
    let red;
    let green;
  
    if (progress <= 30) {
      red = 255;
      green = 0;
    } else {
      red = 0;
      green = 255;
    }
  
    return `linear-gradient(to right, rgb(${red}, ${green}, 0), rgb(${red}, ${green}, 0))`;
  };
  
  
  // 경험치에 따라 경험치 바의 너비를 설정하는 코드
  useEffect(() => {
    let adjustedExperience = Math.max(0, Math.min(experience, 255)); // 경험치 값을 0 이상 255 이하로 조정합니다.
    setExperienceBarWidth((adjustedExperience / 255) * 100);
  }, [experience]);

  return (
    <BrowserRouter>
      <div className="container">
        <div className="header">
          <div className="header_sort">
            <Link to="/">
              <img src="/logo.png" alt="logo_error" className='logo'/>
            </Link>
            <Link to="/person">
              <img src='/person.svg' alt='person_error' className='person'/>
            </Link>
          </div>
        </div>
        <div className="content">
          {selectedIcon === 'star' || selectedIcon === 'moon' ? (
              <>
                <img src={getBackgroundImage()} alt={selectedIcon + 'back'} className="background" />
                <img src={getForegroundImage()} alt="egg.err" className="foreground" />
              </>
            ) : (
              <img src={getForegroundImage()} alt="egg.err" className="background" />
            )}
            <div className="experience-container">
              <div className="experience-container-fill" style={{ width: `${experienceBarWidth}%`, background: getExperienceBarColor() }}></div>
              <div className="experience-text">{experience}</div>
            </div>
        </div>
        <div className="footer">
          <nav className='footer_nav'>
            <Link to="/ranking">
              <img src="/icon/ranking.png" alt='ranking_err' className={selectedIcon === 'ranking' ? 'selectedIcon' : 'ranking'} onClick={() => handleIconClick('ranking')}/>
            </Link>
            <Link to="/community">
              <img src="/icon/community.png" alt='community_err' className={selectedIcon === 'community' ? 'selectedIcon' : 'community'} onClick={() => handleIconClick('community')}/>
            </Link>
            <Link to="/capsule">
              <img src="/icon/capsule.png" alt='capsule_err' className={selectedIcon === 'capsule' ? 'selectedIcon' : 'capsule'} onClick={() => handleIconClick('capsule')}/>
            </Link>
            <Link to="/shop">
              <img src="/icon/shop.png" alt='shop_err' className={selectedIcon === 'shop' ? 'selectedIcon' : 'shop'} onClick={() => handleIconClick('shop')}/>
            </Link>
            <Link to="/search">
              <img src="/icon/search.png" alt='search_err' className={selectedIcon === 'search' ? 'selectedIcon' : 'search'} onClick={() => handleIconClick('search')}/>
            </Link>
          </nav>
        </div>
        <Routes>
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/community" element={<Community />} />
          <Route path="/capsule" element={<Capsule />} />
          <Route path="/shop" element={<Shop selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} experience={experience} setExperience={setExperience} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/person" element={<Person />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

