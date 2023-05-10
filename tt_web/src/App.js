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
    setExperience(newExperience);
  };

  // 임시로 경험치 초기값 변경해주는 코드
  useEffect(() => {
    handleExperienceChange(experience + 100);
  }, []);

  // 경험치에 따라 이미지를 변경해주는 코드
  const getForegroundImage = () => {
    if (experience >= 0 && experience < 100) {
      return '/egg/egg1.gif';
    } else if (experience >= 100 && experience < 200) {
      return '/egg/egg2.gif';
    } else if (experience >= 200 && experience < 300) {
      return '/egg/egg3.gif';
    } else if (experience >= 300) {
      return '/egg/egg4.gif';
    } else {
      return null;
    }
  };

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
            <div className="experience-container">{experience}</div>
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
          <Route path="/shop" element={<Shop setSelectedIcon={setSelectedIcon} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/person" element={<Person />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

