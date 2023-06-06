import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
<<<<<<< HEAD
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
=======
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
>>>>>>> 54eac6cf40af904dd01bfc0d6d10c108bc6b101e

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
<<<<<<< HEAD
=======
const analytics = getAnalytics(app);
>>>>>>> 54eac6cf40af904dd01bfc0d6d10c108bc6b101e

// Firebase 인증 기능 가져오기
const auth = getAuth();

// Firestore 초기화
const db = getFirestore();

<<<<<<< HEAD
  // 회원가입 함수
  export const signup = async ({ nickname, email, password, passwordConfirm }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  // 사용자 정보를 추가합니다. users 컬렉션에 새로운 문서를 생성하고, 문서 내에 필드로 email, password, nickname을 저장합니다.
  await setDoc(doc(collection(db, "users"), user.uid), {
    email,
    password,
    nickname
=======
// 회원가입 함수
export const signup = async ({ nickname, email, password, passwordConfirm }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  // 사용자 정보를 추가합니다.
  await setDoc(doc(db, "users", nickname), {
    email,
    password
>>>>>>> 54eac6cf40af904dd01bfc0d6d10c108bc6b101e
  });

  return user;
}

<<<<<<< HEAD
  // 로그인 함수
  export const login = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await user.getIdToken();
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  const userObj = userDoc.data();
  // 사용자 객체(user)와 ID 토큰(idToken)을 반환합니다.
  return { user: userObj, idToken };
=======
// 로그인 함수
export const login = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
>>>>>>> 54eac6cf40af904dd01bfc0d6d10c108bc6b101e
};
