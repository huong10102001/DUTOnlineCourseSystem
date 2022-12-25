import {initializeApp} from 'firebase/app'
import { getDatabase, ref, push, onValue, query, orderByChild, get } from "firebase/database";

const firebaseConfig = {
  "apiKey": "AIzaSyClOw090QS2lyZxjr_NSoyiO33i3QFvssk",
  "authDomain": "pbl6elearning.firebaseapp.com",
  "databaseURL": "https://pbl6elearning-default-rtdb.asia-southeast1.firebasedatabase.app",
  "projectId": "pbl6elearning",
  "storageBucket": "pbl6elearning.appspot.com",
  "messagingSenderId": "867590390832",
  "appId": "1:867590390832:web:f22800fff6b99cc62159f5",
  "measurementId": "G-ZJTYS5YYZV"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database, ref, push, onValue, query, orderByChild, get, app};
