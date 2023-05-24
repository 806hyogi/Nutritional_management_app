import React, { useEffect } from 'react';
import './App.css';

function Ranking() {
  // 가상의 랭킹 데이터 (예시)
  const rankings = [
    { id: 1, name: '사용자1', experiencePoints: 1000 },
    { id: 2, name: '사용자2', experiencePoints: 900 },
    { id: 3, name: '사용자3', experiencePoints: 800 },

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
      <div className="ranking-title"></div>
      <ul>
        {rankings.slice(0, 3).map((user, index) => (
          <React.Fragment key={user.id}>
            {index !== 0 && <hr className="ranking-line" />}
            <li>
              {index === 0 && (
                <div className="ranking-image">
                  <div className="image-container">
                    <img
                      src="icon/1.png"
                      alt="사용자1"
                      style={{ maxHeight: '100%', maxWidth: '100%' }}
                    />
                  </div>
                </div>
              )}
              {index === 1 && (
                <div className="ranking-image2">
                  <img
                    src="icon/2.png"
                    alt="사용자2"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                </div>
              )}
              {index === 2 && (
                <div className="ranking-image3">
                  <img
                    src="icon/3.png"
                    alt="사용자3"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                </div>
              )}
              <div className="ranking">
                <span>
                  {user.name}
                  <br />
                  Exp {user.experiencePoints}
                </span>
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;
