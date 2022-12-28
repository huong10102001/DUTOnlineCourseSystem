import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  query,
  orderByChild,
  get,
  equalTo,
} from "firebase/database";
// import {  useSelector } from "react-redux";
import { updateKeyNoti } from "../actions/notiAction";
const notification_id = "";
const firebaseConfig = {
  apiKey: "AIzaSyClOw090QS2lyZxjr_NSoyiO33i3QFvssk",
  authDomain: "pbl6elearning.firebaseapp.com",
  databaseURL:
    "https://pbl6elearning-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "pbl6elearning",
  storageBucket: "pbl6elearning.appspot.com",
  messagingSenderId: "867590390832",
  appId: "1:867590390832:web:f22800fff6b99cc62159f5",
  measurementId: "G-ZJTYS5YYZV",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database, ref, push, onValue, query, orderByChild, get, app };
// async getNotification(noti_id: String){
//         await onValue(dbRef(database, 'notifications/' + noti_id), (snapshot) => {
//           const data = Object.values(Object(snapshot.val())['notification'])
//           this.notification_popup = data[data.length-1]
//       })
//     },
// async getNotification(noti_id: String){
//         await onValue(dbRef(database, 'notifications/' + noti_id), (snapshot) => {
//           const data = Object.values(Object(snapshot.val())['notification'])
//           this.notification_popup = data[data.length-1]
//       })
//     },
const getNotificationName = async (user_id, updateKeyNotification) => {
  console.log(user_id);
  const que = await query(
    ref(database, "notifications/"),
    orderByChild("user_id"),
    equalTo(user_id)
  );
  await get(que).then((snapshot: any) => {
    let key = snapshot._node.children_.root_.key;
    let notification_id = snapshot.val();
    updateKeyNotification(key);
    return key;
  });
};

const getNotiHasUnread = async (noti_id, setNotiNumber) => {
  await onValue(ref(database, "notifications/" + noti_id), (snapshot) => {
    setNotiNumber(Object(snapshot.val())["noti_number"]);
  });
};

export { getNotificationName, getNotiHasUnread };
