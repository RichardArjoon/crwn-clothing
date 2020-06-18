import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAOhyvh-IQRrlxwAkaDC1dTI0VXAduQfi4',
  authDomain: 'crwn-db-991d8.firebaseapp.com',
  databaseURL: 'https://crwn-db-991d8.firebaseio.com',
  projectId: 'crwn-db-991d8',
  storageBucket: 'crwn-db-991d8.appspot.com',
  messagingSenderId: '704318903751',
  appId: '1:704318903751:web:7fb97d5d8e8f3aaeaaf5e2',
};

export const createUserProfile = async (userAuth, additionalData) => {
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
        ...additionalData,
      });
    } catch (err) {
      console.log('Error creating user', err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
