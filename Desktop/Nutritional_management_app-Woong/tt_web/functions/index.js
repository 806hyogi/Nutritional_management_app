// Firebase 관련 모듈을 불러옵니다.
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Firebase를 초기화합니다.
admin.initializeApp(functions.config().firebase);

// Firestore 데이터베이스를 참조합니다.
const db = admin.firestore();
const docRef = db.collection("users");

// 매일 00:00 (KST)에 모든 사용자에게 100 포인트를 지급하는 Cloud Function을 정의합니다.
exports.dailyPointUpdate = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone("Asia/Seoul")
  .onRun(async (context) => {
    // Firestore에서 모든 사용자 문서를 가져옵니다.
    const snapshot = await docRef.get();
    snapshot.forEach((doc) => {
      // 각 사용자의 현재 포인트를 가져옵니다.
      const data = doc.data();
      // 사용자의 포인트를 100 포인트 더하여 업데이트합니다.
      docRef.doc(doc.id).update({
        points: data.points + 100,
      });
    });
  });

// 새로운 사용자가 가입할 때마다 실행되는 Cloud Function을 정의합니다.
exports.createUser = functions.auth.user().onCreate((user) => {
  // 사용자가 가입하면 Firestore에 사용자 문서를 생성하고 초기 포인트를 0으로 설정합니다.
  return docRef.doc(user.uid).set({
    email: user.email,
    points: 0,
  });
});

// 사용자가 계정을 삭제할 때마다 실행되는 Cloud Function을 정의합니다.
exports.deleteUser = functions.auth.user().onDelete((user) => {
  // 사용자가 계정을 삭제하면 Firestore에서 해당 사용자의 문서를 삭제합니다.
  return docRef.doc(user.uid).delete();
});
