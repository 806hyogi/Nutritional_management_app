import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAelFFU-J3udH31aa41a2O_f2pSNu6IYa8",
  authDomain: "teunteun-e58c6.firebaseapp.com",
  projectId: "teunteun-e58c6",
  storageBucket: "teunteun-e58c6.appspot.com",
  messagingSenderId: "973060701436",
  appId: "1:973060701436:web:c69d5176d2acf9540b6b79",
  measurementId: "G-7XERBFLCXP"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase 인증 기능 가져오기
const auth = getAuth();

// Firestore 초기화
const db = getFirestore();

// 회원가입 함수
export const signup = async ({ nickname, email, password, passwordConfirm }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  // 사용자 정보를 추가합니다.
  await setDoc(doc(db, "users", nickname), {
    email,
    password
  });

  return user;
}

// 로그인 함수
export const login = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};
