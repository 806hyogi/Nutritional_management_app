import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebaseConfig';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';

function Ranking() {
  const [rankings, setRankings] = useState([]);
  const [isLightOn, setIsLightOn] = useState(false);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const usersSnapshot = await getDocs(query(collection(db, 'users'), orderBy('experience', 'desc'), limit(3)));
        const rankingsData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRankings(rankingsData);
      } catch (error) {
        console.log("Error fetching rankings:", error);
      }
    };

    fetchRankings();

    const intervalId = setInterval(() => {
      setIsLightOn(prevState => !prevState);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="content">
      <div className="ranking-title"></div>
      <ul>
        {rankings.map((user, index) => (
          <React.Fragment key={user.id}>
            {index !== 0 && <hr className="ranking-line" />}
            <li>
              <div
                className={`ranking-image${index + 1}`}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={`icon/${index + 1}.png`}
                  alt={`사용자${index + 1}`}
                  style={{
                    textAlign: 'center',
                    width: '90px',
                    height: '70px',
                    padding: '20px',
                  }}
                  className={index === 0 && isLightOn ? 'light-on' : ''}
                />
              </div>
              <div className="ranking">
                <span>
                  {user.nickname} : Exp {user.experience}
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
