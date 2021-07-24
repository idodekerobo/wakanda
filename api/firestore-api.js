import { firebase, db, auth, storage } from './firebase-config';
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
      // console.log('this is the user object uid ', user.uid)
      
      // set userIdToken to local storage
      const idToken = await user.getIdToken();
      await AsyncStorage.setItem('userIdToken', idToken);

      return user;
   } catch (e) {
      console.log(`There was an error: ${e}`)
   }
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

// TODO - get current auth user helper function doesn't work
export async function getCurrentAuthUser() {
   let fbUser = null;
   fbUser = auth.currentUser;

   if (fbUser) {
      return fbUser;
   } else {
      // if there is no user signedIn -> look for idToken, if no idToken, signInAnon?
      const user = await signInAnon();
      return user;
   }
   
   // CAN'T GET .onAuthStateChanged() to work
      // can't get it to run synchronously so fbUser value gets set to user
      // also can't just return user from the inner onAuthStateChanged function to the outer wrapper function
   /*
   auth.onAuthStateChanged(user => {
      fbUser = user
      // THE BELOW CONSOLE.LOG WORKS
      console.log(`fbUser inside inner func of getCurrentAuthUser, onAuthStateChanged ${fbUser}`) 
   })
   console.log(`return value from getCurrentAuthUser func ${fbUser}`)
   // BUT THIS RETURNS THE NULL FROM EARLIER IN THE FUNC ??
   */
   
}

export async function getStarPinImageFromFb() {
   const imageRef = storage.ref('map-assets/Star_Pin-03-final.png');

   try {
      const url = imageRef.getDownloadURL();
      return url;
   } catch (err) {
      console.log(`there was an error fetching the star pin image`);
      console.log(err)
      return null;
   }
}

// will eventually have to limit pins to 3 per user
export async function pinBusinessToProfile(bizId) {
   // auth.onAuthStateChanged(user => {
      const user = await getCurrentAuthUser();
      const collectionName = 'users';
      if (user) {
         console.log(`user is signed in`)
         const uid = user.uid;
         db.collection(collectionName)
         .doc(uid)
         .set({ // may have to use update({}) to not overwrite existing data, if you use update remove object with merge
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
      }
   // });
}

export async function removePinnedBusinessFromProfile(bizId) {
   const user = await getCurrentAuthUser();
   const collectionName = 'users';
   if (user) {
      // remove the bizId from pinnedBizArr field
      const uid = user.uid;
      db.collection(collectionName)
      .doc(uid)
      .update({
         pinnedBizArr: firebase.firestore.FieldValue.arrayRemove(bizId)
      })
      .then(() => {
         console.log(`doc update was successful`)
      })
      .catch(err => {
         console.log(`there was an error updating the document ${err}`)
      })
   } else {
      console.log(`user is not signed in, cannot remove pinned business`);
   }
}

export async function getUserDataFromFirestore(user) {
   if (!user) return;

   let userObj;
   const collectionName = "users";
   const uid = user.uid;
   const docRef = db.collection(collectionName).doc(uid);

   try {
      const doc = await docRef.get();
      if (doc.exists) {
         userObj = doc.data();
         // console.log(`userobj from get userObj function ${userObj}`)
         return userObj;
      } else {
         // console.log(`no user data found`); // doc.data() will be undefined
         userObj = null;
         return userObj;
      }
   } catch (e) {
      console.log(`error getting user document data ${e}`)
      console.log(`returning null`);
      userObj = null;
      return userObj;
   }   
}

export async function getOneBusinessFromFirestore(docId) {
   if (!docId) return;
   
   let businessObj;
   const collectionName = "businesses";

   const docRef = db.collection(collectionName).doc(docId);

   try {
      const doc = await docRef.get();
      if (doc.exists) {
         businessObj = doc.data();
         // console.log(`biz from getOneBiz func ${businessObj}`)
         return businessObj;
      } else {
         businessObj = null;
         return businessObj;
      }
   } catch (e) {
      console.log(`error getting business document data ${e}`)
      console.log(`returning null`);
      businessObj = null;
      return businessObj;
   }
}

export async function getUserPinnedBusinessIdArr() {
   const user = await getCurrentAuthUser();
   // auth.onAuthStateChanged(async user => {
      if (user) {
         const userObject = await getUserDataFromFirestore(user); // do i have to await this???
         // if userObject is fasly or null just return an empty array that'll get saved to state
         if (!userObject || null) return [ ];
   
         const pinnedBusinessIdArray = userObject.pinnedBizArr;

         // user may be brand new and not have a pinned biz id array so check, if not return an empty array
         if (pinnedBusinessIdArray) return pinnedBusinessIdArray; 
         return [ ];
      } else {
         console.log('user is falsy (null or undefined)')
      }
   // })
}

// passing in pinnedBizArr using helper function above
export async function getUserPinnedBusinesses(pinnedBizArr) {
   if (pinnedBizArr.length == 0) return; // if arr is empty return

   let arrayOfPinnedBusinessObjects = [ ];
   
   for (let bizId of pinnedBizArr) {
      const bizObj = await getOneBusinessFromFirestore(bizId); // do i have to await this too???
      // check if it isn't null/falsy, because in getOneBusinessFromFirestore function you return null if biz isn't found
      if (bizObj) arrayOfPinnedBusinessObjects.push(bizObj);
   }
   return arrayOfPinnedBusinessObjects;
}

export function addBusiness(bizObj) {
   db.collection("submittedBusinesses")
      .add(bizObj)
      .then(docRef => console.log(`Added business w/ ID: ${docRef.id}`))
      .catch(err => errorHandling(err));
}

export async function getAllBusinesses() {
   const collectionName = `businesses`;
   const docRef = db.collection(collectionName);
   let bizArr = [];
   return docRef.get() // have to return here to return the resolved .get() promise since its async
      .then(querySnapshot => {
         querySnapshot.forEach(doc => {
            // updated all documents to have a copy of docId in _id field no need to manually add id
            bizArr.push(doc.data());
         });
         return bizArr; // if resolved it'll return this 
      })
      .catch(err => errorHandling(err));
}

export const getBusinessesOfCity = async (city) => {
   const collectionName = 'businesses';
   const docRef = db.collection(collectionName).where('city', '==', city);

   let bizArr = [];

   return docRef.get()
      .then(querySnapshot => {
         querySnapshot.forEach(doc => {
            // updated all documents to have a copy of docId in _id field no need to manually add id
            bizArr.push(doc.data());
         });
         return bizArr; // if resolved it'll return this 
      })
      .catch(err => {
         console.log(`error getting business of ${city} from firebase`);
         errorHandling(err);
      })
}

export const getBusinessesOfZip = async (zipCode) => {

}

export const getBusinessesOfState = async (state) => {
   // state parameter is a string

   const collectionName = 'businesses';
   const docRef = db.collection(collectionName).where('state', '==', state);

   let bizArr = [];

   return docRef.get()
      .then(querySnapshot => {
         querySnapshot.forEach(doc => {
            // updated all documents to have a copy of docId in _id field no need to manually add id
            bizArr.push(doc.data());
         });
         return bizArr; // if resolved it'll return this 
      })
      .catch(err => {
         console.log(`error getting business of ${city} from firebase`);
         errorHandling(err);
      })
}

export const checkIfStateHasBusinesses = async (state, stateBizArr) => {
   if (stateBizArr.length > 99) return; // if there is already 100 or more biz in state don't do nun

   switch (state) {
      case 'Texas':
         // load biz in AZ, ATL, etc
         break;
      case 'Illinois': 
         // load biz in MI, IN, OH
         break;
      default:
         break;
   }
}


export async function addNewBusinessToFirestore(bizObject) {

   const collectionName = `businesses`;
   const newDocRef = db.collection(collectionName).doc();

   const docId = newDocRef.id;
   const geopoint = new firebase.firestore.GeoPoint(bizObject.coordinates[0], bizObject.coordinates[1]);

   newDocRef.set({
      ...bizObject,
      _id: docId,
      coordinates: geopoint
   });
}

export async function addMultipleNewBusinessesToFirestore(bizArr) {
   for (const biz of bizArr) {
      await addNewBusinessToFirestore(biz);
   }
}

function updateAllBusinessesWithId() {
   const collectionName = `businesses`;
   const docRef = db.collection(collectionName);

   docRef.get()
   .then(querySnapshot => {
      querySnapshot.forEach(doc => {

         db.collection(collectionName)
         .doc(doc.id)
         .update({ // may have to use update({}) to not overwrite existing data
            _id: doc.id
         },
         )
         .then(() => {
            console.log(`updating the doc was successful`)
         })
         .catch(err => {
            console.log(`there was an error updating the document ${err}`);
         })

      });
   })
   .catch(err => {
      console.log(`error grabbing biz snapshot ${err}`)
   })
}

// if business coordinates is array instead of firebase geopoint object
export async function changeBizCoordsArrToGeopoint() {
   const collectionName = `businesses`;
   const docRef = db.collection(collectionName);

   docRef.get()
   .then(querySnapshot => {
      querySnapshot.forEach(doc => {
         const data = doc.data();
         if (!Array.isArray(data.coordinates)) return // if coordinates is not an array (aka is a geopoint) do nothing
         // console.log(data.coordinates)
         const latitude = data.coordinates[0];
         const longitude = data.coordinates[1]

         const geopoint = new firebase.firestore.GeoPoint(latitude, longitude);
         // console.log(doc.id, geopoint)

         db.collection(collectionName)
         .doc(doc.id)
         .update({ // may have to use update({}) to not overwrite existing data
            coordinates: geopoint
         },
         )
         .then(() => {
            console.log(`updating the doc was successful`)
         })
         .catch(err => {
            console.log(`there was an error updating the document ${err}`);
         })
      });
   })
   .catch(err => {
      console.log(`error grabbing biz snapshot ${err}`)
   })  
}

// export async function removeStateBusinesses(state) {
//    const collectionName = `businesses`;
//    const docRef = db.collection(collectionName).where("state","==",state);
//    // const arr = [];
   
//    const querySnapshot = await docRef.get()
//    querySnapshot.forEach(doc => {
//       // arr.push(doc.data())
//       doc.ref.delete();
//    })
   
//    // console.log(arr.length);
// }

// export const quickBizCount = async () => {
//    const collectionName = `businesses`;
//    const docRef = db.collection(collectionName);

//    let length = 0;

//    try {
//       const querySnapshot = await docRef.get();
//       querySnapshot.forEach(doc => {
//          length++;
//       })
//    } catch (e) {
//       console.log('error')
//       console.log(e);
//    }
//    console.log(length)
// }