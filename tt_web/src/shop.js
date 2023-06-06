import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';
import * as jose from 'jose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Shop({ selectedIcon, setSelectedIcon }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [items, setItems] = useState(null);
  const [experience, setExperience] = useState(0);
  const notify = () => toast("경험치가 부족하여 구매할 수 없습니다.", { position: "top-center" });

  const fetchCurrentUser = async () => {
    const uT = localStorage.getItem('userToken');
    const token = jose.decodeJwt(uT);

    if (token) {
      const userEmail = token.firebase.identities.email[0];
      const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
      const usersSnapshot = await getDocs(usersQuery);

      if (!usersSnapshot.empty) {
        const userDocSnapshot = usersSnapshot.docs[0];
        setCurrentUser({ id: userDocSnapshot.id, ...userDocSnapshot.data() });
        setExperience(userDocSnapshot.data().experience || 0);
        const userItems = userDocSnapshot.data().items || {};
        setItems(userItems);
        const selectedItem = Object.keys(userItems).find(item => userItems[item] === true);
        setSelectedIcon(selectedItem || null);
      } else {
        alert("No user found with this email");
      }
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleItemClick = async (itemName, cost) => {
    if (items && !items[itemName] && selectedIcon !== itemName && currentUser) {
      const newExperience = experience - cost;
      const newItems = { ...items, [itemName]: true };

      if (newExperience >= 0) {
        try {
          setSelectedIcon(itemName);
          await updateDoc(doc(db, 'users', currentUser.id), {
            experience: newExperience,
            items: newItems,
            selectedIcon: itemName
          });
          setExperience(newExperience);
          setItems(newItems);
        } catch (error) {
          alert("Error updating user's experience and items: " + error.message);
        }
      } else {
        notify();
      }
    }
  };

  return (
    <div className="content">
      <ToastContainer />
      <div>
        <div className="product-card">
          <div className="product-tumb">
            <img src="/shop/star.jpg" alt="" onClick={() => handleItemClick('star', 10)} />
          </div>
          <div className="product-details">
            <span className="product-catagory">background-style</span>
            <h4><a>STAR</a></h4>
            <p>배경에 별을 넣어서 색다른 환경을 경험하세요!</p>
            <div className="product-bottom-details">
              <div className="product-price">10 Point</div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <div className="product-tumb">
            <img src="/shop/moon.jpg" alt="" onClick={() => handleItemClick('moon', 20)} />
          </div>
          <div className="product-details">
            <span className="product-catagory">background-style</span>
            <h4><a>MOON</a></h4>
            <p>배경에 달을 넣어서 로맨틱한 분위기를 즐겨보세요!</p>
            <div className="product-bottom-details">
              <div className="product-price">20 Point</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;

