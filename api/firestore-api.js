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
         console.log(`user not found ${doc}`);
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

export async function getUserPinnedBusinesses() {
   const user = await getCurrentAuthUser();
   // auth.onAuthStateChanged(async user => {
      if (user) {
         const userObject = await getUserDataFromFirestore(user); // do i have to await this???
         if (!userObject) return userObject;
   
         const pinnedBusinessIdArray = userObject.pinnedBizArr;
         let arrayOfPinnedBusinessObjects = [ ];
   
         for (let bizId of pinnedBusinessIdArray) {
            const bizObj = await getOneBusinessFromFirestore(bizId); // do i have to await this too???
            arrayOfPinnedBusinessObjects.push(bizObj);
         }
         return arrayOfPinnedBusinessObjects;
      } else {
         console.log('user is falsy (null or undefined)')
      }
   // })
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

const updateAllBizToBreakoutAddress = async () => {
   const collectionName = `businesses`;
   const docRef = db.collection(collectionName);

   docRef.get()
   .then(querySnapshot => {
      querySnapshot.forEach(doc => {
         const biz = doc.data();

         const address = biz.address;
         const addressLength = address.length;

         // example address string:
            // "114 W Adams St, Phoenix, AZ 85003"
         

         const indexOfFirstComma = address.indexOf(', ')
         const streetAddress = address.substring(0, indexOfFirstComma);
         // console.log(streetAddress);

         const indexOfSecondComma = address.indexOf(', ', indexOfFirstComma+2);
         const city = address.substring(indexOfFirstComma+2, indexOfSecondComma)
         // console.log(city);

         const zip = address.substr((addressLength-5))
         // console.log(zip);

         doc.ref.update({
            streetAddress,
            city,
            zip,
            state: 'Arizona',
         })
      })
   })
}

export function updateAllBusinessesWithId() {
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