import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="header">
        <div className="header_sort">
          <img src="/logo.png" alt="logo_error" className='logo'/>
          <img src='/person.svg' alt='person_error' className='person'/>
        </div>
    </div>
      <div className="content">Content</div>
      <div className="footer">
        <nav className='footer_nav'>
          <a id='ranking' href=''>
            <img src="/icon/ranking.png" alt='ranking_err' className='ranking'/>
          </a>
          <a id='community' href=''>
            <img src="/icon/community.png" alt='community_err' className='community'/>
          </a>
          <a id='shop' href=''>
            <img src="/icon/shop.png" alt='shop_err' className='shop'/>
          </a>
          <a id='capsule' href=''>
            <img src="/icon/capsule.png" alt='capsule_err' className='capsule'/>
          </a>
          <a id='search' href=''>
            <img src="/icon/search.png" alt='search_err' className='search'/>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default App;
