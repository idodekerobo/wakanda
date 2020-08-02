import { db } from './firebase-config';

// TODO - build out business document w/ website, hours, etc

function errorHandling(err) {
   console.log('There was an error');
   console.log(err);
}

export function setData(docId) {
   // db.collection("businesses").doc(docId)
   //    .set({
   //       name: "idode's biz",
   //       address: "somewhere in tempe, az"
   //    })
   //    .catch(err => errorHandling(err));
   // console.log('data sent');
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