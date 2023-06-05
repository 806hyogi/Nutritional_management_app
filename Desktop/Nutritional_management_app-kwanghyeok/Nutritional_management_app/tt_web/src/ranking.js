import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebaseConfig';
import { collection, query ,getDocs, orderBy, limit } from 'firebase/firestore';

function Ranking() {
  const [rankings, setRankings] = useState([]);

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
  }, []);

  return (
    <div className="content">
      <div className="ranking-title"></div>
      <ul>
        {rankings.map((user, index) => (
          <React.Fragment key={user.id}>
            {index !== 0 && <hr className="ranking-line" />}
            <li>
              <div className={`ranking-image${index + 1}`}>
                <img
                  src={`icon/${index + 1}.png`}
                  alt={`사용자${index + 1}`}
                  style={{ height: '65px', Width: '65px' }}
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