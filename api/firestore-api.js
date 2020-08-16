import { db, auth } from './firebase-config';

function errorHandling(err) {
   console.log();
   console.log('There was a FIREBASE API ERROR');
   console.log();
   console.log(`Error code: ${err.code}`);
   console.log(`Error message: ${err.message}`);
   console.log(err);
   console.log();
}

export function signInAnon() {
   auth.signInAnonymously().catch(err => errorHandling(err));
}

export function authListener() {
   auth.onAuthStateChanged(user => {
      if (user) {
         console.log(user);
      } else {
         console.log('user is signed out');
      }
   });
}

export function addBusiness(bizObj) {
   db.collection("submittedBusinesses")
      .add(bizObj)
      .then(docRef => console.log(`Added business w/ ID: ${docRef.id}`))
      .catch(err => errorHandling(err));
}

export function getAllBusinesses() {
   const docRef = db.collection("businesses");
   var bizArr = [];
   return docRef.get() // have to return here to return the resolved .get() promise since its async
      .then(querySnapshot => {
         querySnapshot.forEach(doc => {
            var bizObj = {};
            bizObj._id = doc.id;
            Object.assign(bizObj, doc.data());
            bizArr.push(bizObj);
         });
         return bizArr; // if resolved it'll return this 
      })
      .catch(err => errorHandling(err));
}