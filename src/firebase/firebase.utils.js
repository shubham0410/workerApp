import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCaWxKgHpH0bc7pNjT7xbp_otlWXsrlaMQ",
  authDomain: "demostart-d8f0f.firebaseapp.com",
  databaseURL: "https://demostart-d8f0f.firebaseio.com",
  projectId: "demostart-d8f0f",
  storageBucket: "demostart-d8f0f.appspot.com",
  messagingSenderId: "171339198007",
  appId: "1:171339198007:web:dc971ac0e29f15c31399b2",
  measurementId: "G-8WKG2QLPEX"

};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
