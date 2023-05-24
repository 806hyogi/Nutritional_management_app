import React from 'react';
import './App.css';

function Ranking() {
  // 가상의 랭킹 데이터 (예시)
  const rankings = [
    { id: 1, name: '사용자1', experiencePoints: 1000 },
    { id: 2, name: '사용자2', experiencePoints: 900 },
    { id: 3, name: '사용자3', experiencePoints: 800 },
    { id: 4, name: '사용자4', experiencePoints: 700 },
    { id: 5, name: '사용자5', experiencePoints: 600 },
  ];

  return (
    <div className="content">
      <div className="ranking-title">
        <h1>랭킹</h1>
      </div>

      <ul>
        {rankings.slice(0, 3).map((user, index) => (
          <li key={user.id}>

            {index === 0 && (
              <img
                className="ranking-image"
                src="icon/1.png"
                alt="사용자1"
              />
            )}
            {index === 1 && (
              <img
                className="ranking-image"
                src="icon/2.png"
                alt="사용자2"
              />
            )}
            {index === 2 && (
              <img
                className="ranking-image"
                src="icon/3.png"
                alt="사용자3"
              />
            )}
            <div className='ranking'>
              <span>{user.name}</span>
              
              <span> - 경험치: {user.experiencePoints}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
