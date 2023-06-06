<<<<<<< HEAD
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
=======
import React from 'react';
import './App.css';

function Ranking() {
  return (
    <div className="content">
      // Ranking 컴포넌트의 컨텐츠
>>>>>>> 54eac6cf40af904dd01bfc0d6d10c108bc6b101e
    </div>
  );
}

<<<<<<< HEAD
export default Ranking;
=======
export default Ranking;
>>>>>>> 54eac6cf40af904dd01bfc0d6d10c108bc6b101e
