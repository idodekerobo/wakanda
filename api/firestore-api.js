import { firebase, db, auth } from './firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function errorHandling(err) {
   console.log();
   console.log('There was a FIREBASE API ERROR');
   console.log();
   console.log(`Error code: ${err.code}`);
   console.log(`Error message: ${err.message}`);
   console.log(err);
   console.log();
}

export async function signInAnon() {
   try {
      const response = await auth.signInAnonymously()
      const user = response.user;
      console.log('this is the user object uid ', user.uid, ' ', user.displayName)
      
      const idToken = await user.getIdToken();
      await AsyncStorage.setItem('userIdToken', idToken);
   } catch (e) {
      console.log(`There was an error: ${e}`)
   }

   // auth.signInAnonymously()  // returns a promise
   // .then(returnObj => {
   //    // console.log(`just signed in user from signInAnonymously() here's the uid: ${returnObj.user.uid}`);
   //    return returnObj;
   // })
   // .catch(err => {
   //    console.log(`there was an error signing user in ${err}`);
   // });
}

export async function getUserIdToken() {
   try {
      // get from async, and return the value, will return null if it doesn't exist
      const idToken = await AsyncStorage.getItem('userIdToken');
      return idToken;
   } catch (e) {
      console.log(`There was an error ${e}`)
      return null
   }
}


export function pinBusinessToProfile(bizId) {
   auth.onAuthStateChanged(user => {
      if (user) {
         console.log(`user is signed in`)
         const uid = user.uid;
         db.collection('users')
         .doc(uid)
         .set({ // may have to use update({}) to not overwrite existing data
            pinnedBizArr: firebase.firestore.FieldValue.arrayUnion(bizId)
         },
         {merge: true})
         .then(() => {
            console.log(`the doc set was successful`)
         })
         .catch(err => {
            console.log(`there was an error setting the document ${err}`);
         })
      } else {
         console.log('user is NOT signed in CANNOT pin business');
         auth.signInAnonymously()
         .then(returnObj => {
            // user is signed in
            const currentUser = returnObj.user;
            const uid = currentUser.uid;

            // pin biz to profile
            db.collection('users')
            .doc(uid)
            .set({ // may have to use update({}) to not overwrite existing data
               pinnedBizArr: firebase.firestore.FieldValue.arrayUnion(bizId)
            },
               { merge: true })
            .then(() => {
               console.log(`the doc set was successful`)
            })
            .catch(err => {
               console.log(`there was an error setting the document ${err}`);
            })
         })
         .catch(err => {
            console.log(`could not sign user in anonymously ${err}`);
         })
      }
   });
}

export function getUserPinnedBusinesses() {
   auth.onAuthStateChanged(async user => {
      if (user) {
         const docReference = db.collection("users").doc(user.uid);
         try {
            const doc = await docReference.get();
            console.log(`doc inside first try block ${doc}`)
            if (doc.exists) {
               const userPinnedBizIdArr = doc.data().pinnedBizArr;
               console.log(`doc data inside if doc.exists ${doc.data().pinnedBizArr}`)
               // look up those pinned businesses and return data to screen: 
               let bizObjectArray = [];
               for (const biz of userPinnedBizIdArr) {
                  try {
                     let bizObjRef = await db.collection("businesses").doc(biz).get();
                     if (bizObjRef.exists) {
                        // console.log(`this is the current doc ${JSON.stringify(bizObjRef.data())}`)
                        bizObjectArray = [...bizObjectArray, bizObjRef.data()]
                     } else {
                        console.log(`this bizId isn't found in the biz collection`);
                     }
                  } catch (err) {
                     console.log(`there was an error getting ${biz} in businesses collection ${err}`)
                  }
               };
               console.log(`returning ${bizObjectArray}`);
               return bizObjectArray;
            } else {
               console.log(`no such data, user is undefined`)
            }
         } catch (err) {
            console.log(`Error getting the document ${err}`);
         }
      } else {
         console.log(`user is not signed in`);
      }
   })
}

export function addBusiness(bizObj) {
   db.collection("submittedBusinesses")
      .add(bizObj)
      .then(docRef => console.log(`Added business w/ ID: ${docRef.id}`))
      .catch(err => errorHandling(err));
}

export function getAllBusinesses() {
   const docRef = db.collection("businesses");
   let bizArr = [];
   return docRef.get() // have to return here to return the resolved .get() promise since its async
      .then(querySnapshot => {
         querySnapshot.forEach(doc => {
            let bizObj = {};
            bizObj._id = doc.id;
            Object.assign(bizObj, doc.data());
            bizArr.push(bizObj);
         });
         return bizArr; // if resolved it'll return this 
      })
      .catch(err => errorHandling(err));
}