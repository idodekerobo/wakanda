import { getDistance } from 'geolib';

export const SUBMIT_BIZ_FORM_URL_LINK = 'https://airtable.com/shr3p0hSQyyfL0LTy'

export const categoryGetter = (bizCategory) => {
   if (bizCategory === 'restaurant') return 1;
   if (bizCategory === 'cosmetics') return 2;
   if (bizCategory === 'arts') return 3;
   if (bizCategory === 'clothing') return 3;
   if (bizCategory === 'technology') return 4;
   if (bizCategory === 'other') return 4;
}

export const distanceBetweenLocationAndBusiness = (currentLocation, bizLocationObj) => {
   
   const locationCoords = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude
   }
   // console.log('obj keys', Object.keys(bizLocationObj));

   const bizCoords = {
      latitude: bizLocationObj.latitude,
      longitude: bizLocationObj.longitude,
   }

   const distanceInMeters = getDistance(locationCoords, bizCoords);
   const distanceInMiles = 0.000621371*distanceInMeters;
   // const distanceInMilesDivision = distanceInMeters/1609.34;

   // console.log(distanceInMiles)
   if (distanceInMiles > 20) {
      return distanceInMiles.toFixed(0)
   } else {
      return distanceInMiles.toFixed(1);
   }
}

export const quickSort = (array) => {
   // won't need 3 distinct return cases if base case is array.length <= 1 return array;
   // would just need first return case
   if (array.length === 1) return array;

   const pivot = array[array.length-1];

   const leftArr = [];
   const rightArr = [];
   
   // loop thru every element of array except the last one, which is our pivot
   for (let i=0; i < array.length-1; i++) {
      if (array[i] < pivot) {
         leftArr.push(array[i]);
      } else {
         rightArr.push(array[i]);
      }
   }

   // 3 possible cases
   if (leftArr.length > 0 && rightArr.length > 0) { // we have two arrays
      return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
   } else if (leftArr.length > 0) { // rightArr is empty, we have one arr
      return [...quickSort(leftArr), pivot];
   } else { // rightArr.length > 0 and left is empty
      return [pivot, ...quickSort(rightArr)]
   }

}

// making this async so its not blocking
export const sortBizArr = async (bizArr, currentLocation) => {
   // need to pass in the bizArr and sort that from largest to smallest
   if (bizArr.length === 1) return bizArr;

   const pivotBiz = bizArr[bizArr.length-1];
   const pivotBizDistance = distanceBetweenLocationAndBusiness(currentLocation, pivotBiz.coordinates)

   const leftBizArr = [];
   const rightBizArr = [];
   
   // loop thru every element of array except the last one, which is our pivot
   for (let i=0; i < bizArr.length-1; i++) {
      let currentBiz = bizArr[i];
      let currentBizDistance = distanceBetweenLocationAndBusiness(currentLocation, currentBiz.coordinates);
      if (currentBizDistance < pivotBizDistance) {
         leftBizArr.push(bizArr[i]);
      } else {
         rightBizArr.push(bizArr[i]);
      }
   }

   // 3 possible cases
   if (leftBizArr.length > 0 && rightBizArr.length > 0) { // we have two arrays
      return [...quickSort(leftBizArr), pivotBiz, ...quickSort(rightBizArr)];
   } else if (leftBizArr.length > 0) { // rightBizArr is empty, we have one arr
      return [...quickSort(leftBizArr), pivotBiz];
   } else { // rightBizArr.length > 0 and left is empty
      return [pivotBiz, ...quickSort(rightBizArr)]
   }

}