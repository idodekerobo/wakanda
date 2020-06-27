import { db } from './firebase-config';

export function setData() {
   db.collection("businesses").doc("idode's biz").set({
      name: "idode's biz",
      address: "1121 W Dawn Dr"
   });
   console.log('data sent');
}

export function getData() {
   const docRef = db.collection("businesses").doc("lmN6MEEHFrlwnEfGGLQm");
   docRef.get()
   .then(doc => {
      if (doc.exists) {
         console.log("here's the data", doc.data());
      } else {
         console.log('doesn\'t exist');
      }
   })
   .catch(err => {
      console.log('There was an error:', err);
   });
}
