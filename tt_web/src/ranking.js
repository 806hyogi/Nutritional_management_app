import React, { useEffect } from 'react';
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

/* 1등 왕관 라이트 효과 */
  useEffect(() => {
    const imageElements = document.querySelectorAll('.ranking-image img');
    let isLightOn = false;

    const toggleImageLight = () => {
      imageElements.forEach((image) => {
        if (isLightOn) {
          image.classList.remove('light-on');
        } else {
          image.classList.add('light-on');
        }
      });

      isLightOn = !isLightOn;
    };

    const intervalId = setInterval(toggleImageLight, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="content">
      <div className="ranking-title">

      </div>
      <ul>
        {rankings.slice(0, 3).map((user, index) => (
          <li key={user.id}>
            {index === 0 && (
              <div className="ranking-image">
                <img
                  src="icon/1.png"
                  alt="사용자1"
                />
              </div>
            )}
            {index === 1 && (
              <div className="ranking-image2">
              <img
                src="icon/2.png"
                alt="사용자2"
              />
            </div>
            )}
            {index === 2 && (
              <div className="ranking-image3">
              <img
                src="icon/3.png"
                alt="사용자3"
              />
            </div>
            )}
            <div className='ranking'>
              <span>
                {user.name}
                <br/>
                Exp {user.experiencePoints}
                </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
