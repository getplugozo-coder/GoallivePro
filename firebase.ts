
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// 💡 تنبيه: هذه قيم تجريبية، التطبيق سيعمل بنظام Mock Data حتى تضع قيمك الحقيقية
const firebaseConfig = {
  apiKey: "AIzaSy-PLACEHOLDER", 
  authDomain: "goallive-pro.firebaseapp.com",
  projectId: "goallive-pro",
  storageBucket: "goallive-pro.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

let db: any = null;
let auth: any = null;

try {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.log("Firebase system ready");
} catch (error) {
  console.warn("Firebase configuration is missing or invalid. Operating in Demo Mode.");
}

export { db, auth };
