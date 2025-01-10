// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvzoObdbPINM_-8CJylQfZzQAw60I3v1U",
  authDomain: "notification-test-6e6cb.firebaseapp.com",
  projectId: "notification-test-6e6cb",
  storageBucket: "notification-test-6e6cb.firebasestorage.app",
  messagingSenderId: "1021091210008",
  appId: "1:1021091210008:web:033c7873b9c315d96f746d",
  measurementId: "G-MDGMYTW5WS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
// const analytics = getAnalytics(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BP7eugTRH8lnk2M7d9gS2pSYS4qAN8AIca-gAIXglXUu0RjFUV2vBJMMk3TvWYpBGjRSlakkytt9AIh7E3-T8PU",
    });
    console.log(token);
  }
};
