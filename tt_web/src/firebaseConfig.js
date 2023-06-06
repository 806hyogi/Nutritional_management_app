import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import * as jose from 'jose';

const firebaseConfig = {
  apiKey: "AIzaSyAelFFU-J3udH31aa41a2O_f2pSNu6IYa8",
  authDomain: "teunteun-e58c6.firebaseapp.com",
  projectId: "teunteun-e58c6",
  storageBucket: "teunteun-e58c6.appspot.com",
  messagingSenderId: "973060701436",
  appId: "1:973060701436:web:c69d5176d2acf9540b6b79",
  measurementId: "G-7XERBFLCXP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, jose };
