import firebase from 'firebase';
import { firebaseConfig } from './firebase/config.js.js'

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDB = firebaseApp.database();
