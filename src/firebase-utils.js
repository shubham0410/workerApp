import app from 'firebase/app';
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

app.initializeApp(config);

export const createUserProfileDocument = async (user, additionalData) => {
  console.log('creating user');
  await auth.createUserWithEmailAndPassword(
    user.email,
    user.password)
  .then(function success(userAuth){
    console.log(userAuth.user.uid)
    const userRef = firestore.doc(`users/${userAuth.user.uid}`);
    const snapShot = userRef.get();
    console.log(snapShot);
    console.log(userRef);
    if (!snapShot.exists) {
    const displayName = user.name;
    const email = user.email;
    const createdAt = new Date();
    try {
       userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });

      console.log('created user');

    } catch (error) {
      console.log('error creating user', error.message);
      throw(error);
    }
  }
    return userRef;
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    throw(error);
  });
};

export const createRequest = async (request) => {
  console.log('registering request');
    const userRef = firestore.doc(`requests/${request.requestId}`);
    const snapShot = userRef.get();
    if (!snapShot.exists) {
    const address = request.address;
    const category = request.category;
    const location = request.location;
    const countRequested = request.count;
    const requestTime = new Date();
    const serviceTimeStart = request.startTime;
    const serviceTimeEnd = request.endTime;
    const userId = request.userId;
    const status = "NEW";
    try {
       userRef.set({
        address,
        category,
        location,
        countRequested,
        requestTime,
        serviceTimeStart,
        serviceTimeEnd,
        userId,
        status
      });

      console.log('created request');

    } catch (error) {
      console.log('error creating user', error.message);
      throw(error);
    }
    return userRef;
  }
};

export const userLogin = async (username, password) => {
  console.log('logging in user');
  await auth.signInWithEmailAndPassword(
    username,
    password)
  .then(function success(userAuth){
    console.log(userAuth);
    console.log(userAuth.user.uid)
    return userAuth;
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
    throw(error);
  });
};

export const auth = app.auth();
export const firestore = app.firestore();

export default firestore;