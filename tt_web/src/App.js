import React, { useState } from 'react';
import './App.css';

import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Capsule from './capsule.js';
import Community from './community.js';
import Ranking from './ranking.js';
import Search from './search.js';
import Shop from './shop.js';
import Person from './person.js';

function App() {

  // useState 훅을 불러온다
  const [selectedIcon, setSelectedIcon] = useState('');

  // selectedIcon과 해당 아이콘을 클릭했을 때 실행되는 함수 handleIconeClick정의
  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
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
        <div className="content">Content</div>
        <div className="footer">
          <nav className='footer_nav'>
            <Link to="/ranking">
              <img src="/icon/ranking.png" alt='ranking_err' className={selectedIcon === 'ranking' ? 'selectedIcon' : 'ranking'} onClick={() => handleIconClick('ranking')}/>
            </Link>
            <Link to="/community">
              <img src="/icon/community.png" alt='community_err' className={selectedIcon === 'community' ? 'selectedIcon' : 'community'} onClick={() => handleIconClick('community')}/>
            </Link>
            <Link to="/shop">
              <img src="/icon/shop.png" alt='shop_err' className={selectedIcon === 'shop' ? 'selectedIcon' : 'shop'} onClick={() => handleIconClick('shop')}/>
            </Link>
            <Link to="/capsule">
              <img src="/icon/capsule.png" alt='capsule_err' className={selectedIcon === 'capsule' ? 'selectedIcon' : 'capsule'} onClick={() => handleIconClick('capsule')}/>
            </Link>
            <Link to="/search">
              <img src="/icon/search.png" alt='search_err' className={selectedIcon === 'search' ? 'selectedIcon' : 'search'} onClick={() => handleIconClick('search')}/>
            </Link>
          </nav>
        </div>
        <Routes>
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/community" element={<Community />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/capsule" element={<Capsule />} />
          <Route path="/search" element={<Search />} />
          <Route path="/person" element={<Person />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
