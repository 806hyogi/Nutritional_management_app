import React, { useEffect, useState } from 'react';
import './App.css';
import profileImage from './icon/profile-image.png';

import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import * as jose from 'jose';

function Person() {
  const [jwtdata, setJwtdata] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const uT = localStorage.getItem('userToken');
    const token = jose.decodeJwt(uT);
    setJwtdata(token);

    const fetchUserData = async () => {
      if (token) {
        const userEmail = token.firebase.identities.email[0]; // 사용자 이메일 추출

        try {
          const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
          const usersSnapshot = await getDocs(usersQuery);
          
          if (!usersSnapshot.empty) {
            const userDocSnapshot = usersSnapshot.docs[0];
            console.log('User data:', userDocSnapshot.data());
            setUserData(userDocSnapshot.data());
          } else {
            console.log("No user found with this email");
            // 적절한 사용자 반응을 보여줄 수 있습니다.
          } 
        } catch (error) {
          console.log("Error getting document:", error);
          // 에러 발생 시 적절한 사용자 반응을 보여줄 수 있습니다.
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="content">
      <div className='profile-contain'>
        <div className="profile-image"><img src={profileImage} alt="Profile"/></div>
        {jwtdata && userData && userData.nickname && <h2 className='welcome'>안녕하세요!<br/>{userData.nickname}님</h2>}
        <div className='main_contain'>
          <div className='main'>
            <label>나이: 23{age}</label>
          </div>
          <div className='main'>
            <label>성별: 남{gender}</label>
          </div>
          <div className='main'>
            <label>관심분야: 간건강{interests}</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Person;
