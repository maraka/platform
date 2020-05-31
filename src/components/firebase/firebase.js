import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/storage';



const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();

  }

  // Authentication API
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

 // *** User API ***
  dUser = uid => this.db.collection('users').doc(uid);

  cUsers = () => this.db.collection('users');

   // *** Request API ***
   dRequest = rid => this.db.collection('requests').doc(rid);
   dRequestDetail = rid => this.db.collection('requests').doc(rid).collection('datasheet').doc('data');

   cRequests = () => this.db.collection('requests');
   cRequestsLimited = limit => this.db.collection('requests').limit(limit);

      // *** Organization API ***
      dOrg = rid => this.db.collection('organizations').doc(rid);
  
      cOrg = () => this.db.collection('organizations');

  // *** Storage API ***
  rStorage = () => this.storage.ref()


}

export default Firebase;