import React, { useState, useEffect } from 'react';
import './App.css';
import profileImage from './icon/profile-image.png';

function MyPage() {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    // 데이터베이스에서 필요한 정보를 가져오는 비동기 함수 호출
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 데이터베이스에서 닉네임, 나이, 성별, 관심분야를 가져오는 비동기 요청
      const response = await fetch('/api/mypage'); // 적절한 엔드포인트 경로로 변경해야 합니다.
      const data = await response.json();

      // 가져온 데이터를 상태로 설정
      setNickname(data.nickname);
      setAge(data.age);
      setGender(data.gender);
      setInterests(data.interests);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <div className="content">
      <div className='profile-contain'>
        <div className="profile-image"><img src={profileImage} alt="Profile"/></div>
        <h2 className='welcome'>안녕하세요!<br/>{nickname}최광혁님</h2>
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
  );
}

export default MyPage;
