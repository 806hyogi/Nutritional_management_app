import React, { useState, useEffect } from 'react';
import './App.css';

import { db } from './firebaseConfig';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import * as jose from 'jose';

import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Capsule from './capsule.js';
import Community from './community.js';
import Ranking from './ranking.js';
import Search from './search.js';
import Shop from './shop.js';
import Person from './person.js';

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idToken = params.get('token');

    const myStorage = window.localStorage;
    myStorage.setItem('userToken', idToken);

    if (idToken) {
      const token = jose.decodeJwt(idToken);
      const userEmail = token.firebase.identities.email[0]; // 사용자 이메일 추출

      const checkExperienceField = async () => {
        try {
          const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
          const usersSnapshot = await getDocs(usersQuery);

          if (!usersSnapshot.empty) {
            const userDocSnapshot = usersSnapshot.docs[0];
            const userData = userDocSnapshot.data();

            if (!userData.experience) {
              // 경험치 필드가 존재하지 않을 경우 초기화
              const userDocRef = doc(db, 'users', userDocSnapshot.id);
              await setDoc(userDocRef, { experience: 0 }, { merge: true });
            }
          } else {
            console.log("No user found with this email");
            // 적절한 사용자 반응을 보여줄 수 있습니다.
          }
        } catch (error) {
          console.log("Error checking experience field:", error);
          // 에러 발생 시 적절한 사용자 반응을 보여줄 수 있습니다.
        }
      };

      checkExperienceField();
    }
  }, []);

  const [selectedIcon, setSelectedIcon] = useState('');
  const [experience, setExperience] = useState(0);
  const [experienceBarWidth, setExperienceBarWidth] = useState(0);

  const increaseExperience = (amount) => {
    setExperience(prevExperience => prevExperience + amount);
  }

  const checkExperienceField = (userEmail) => {
    try {
      const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
      const unsub = onSnapshot(usersQuery, (snapshot) => {
        
        if (!snapshot.empty) {
          const userDocSnapshot = snapshot.docs[0];
          const userData = userDocSnapshot.data();
  
          if (!userData.experience) {
            // 경험치 필드가 존재하지 않을 경우 초기화
            const userDocRef = doc(db, 'users', userDocSnapshot.id);
            setDoc(userDocRef, { experience: 0 }, { merge: true });
          }
  
          // 가져온 경험치를 상태 변수에 설정
          setExperience(userData.experience || 0);
        } else {
          console.log("No user found with this email");
          // 적절한 사용자 반응을 보여줄 수 있습니다.
        }
      });
  
      // 컴포넌트가 언마운트될 때 구독을 취소합니다.
      return () => unsub();
    } catch (error) {
      console.log("Error checking experience field:", error);
      // 에러 발생 시 적절한 사용자 반응을 보여줄 수 있습니다.
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idToken = params.get('token');

    const myStorage = window.localStorage;
    myStorage.setItem('userToken', idToken);
    
    if (idToken) {
      const token = jose.decodeJwt(idToken);
      const userEmail = token.firebase.identities.email[0]; // 사용자 이메일 추출
      checkExperienceField(userEmail);

    }
  }, []);


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
              <img src="/logo.png" alt="logo_error" className="logo" />
            </Link>
            <Link to="/person">
              <img src="/person.svg" alt="person_error" className="person" />
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
          <nav className="footer_nav">
            <Link to="/ranking">
              <img src="/icon/ranking.png" alt="ranking_err" className={selectedIcon === 'ranking' ? 'selectedIcon' : 'ranking'} onClick={() => handleIconClick('ranking')} />
            </Link>
            <Link to="/community">
              <img src="/icon/community.png" alt="community_err" className={selectedIcon === 'community' ? 'selectedIcon' : 'community'} onClick={() => handleIconClick('community')} />
            </Link>
            <Link to="/capsule">
              <img src="/icon/capsule.png" alt="capsule_err" className={selectedIcon === 'capsule' ? 'selectedIcon' : 'capsule'} onClick={() => handleIconClick('capsule')} />
            </Link>
            <Link to="/shop">
              <img src="/icon/shop.png" alt="shop_err" className={selectedIcon === 'shop' ? 'selectedIcon' : 'shop'} onClick={() => handleIconClick('shop')} />
            </Link>
            <Link to="/search">
              <img src="/icon/search.png" alt="search_err" className={selectedIcon === 'search' ? 'selectedIcon' : 'search'} onClick={() => handleIconClick('search')} />
            </Link>
          </nav>
        </div>
      <Routes>
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/community" element={<Community increaseExperience={increaseExperience} />} />
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
