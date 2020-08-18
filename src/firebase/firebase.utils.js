import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDL2IDQwL2Uz9hdcV_GN4tBvLTuVMsR4Zg",
  authDomain: "crown-db-e5f69.firebaseapp.com",
  databaseURL: "https://crown-db-e5f69.firebaseio.com",
  projectId: "crown-db-e5f69",
  storageBucket: "crown-db-e5f69.appspot.com",
  messagingSenderId: "978882190179",
  appId: "1:978882190179:web:e249ade69df73442d01156",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShop = await userRef.get();

  if (!snapShop.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
