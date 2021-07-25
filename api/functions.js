import { getDistance } from 'geolib';

export const SUBMIT_BIZ_FORM_URL_LINK = 'https://airtable.com/shr3p0hSQyyfL0LTy'

export const categoryGetter = (bizCategory) => {
   if (bizCategory === 'restaurant') return 1;
   if (bizCategory === 'food') return 1;
   if (bizCategory === 'cosmetics') return 2;
   if (bizCategory === 'beauty') return 2;
   if (bizCategory === 'arts') return 3;
   if (bizCategory === 'art') return 3;
   if (bizCategory === 'clothing') return 3;
   if (bizCategory === 'technology') return 4;
   return 4; // other category
}

export const distanceBetweenLocationAndBusiness = (currentLocation, bizLocationObj) => {
   const locationCoords = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude
   }

   const bizCoords = {
      latitude: bizLocationObj.latitude,
      longitude: bizLocationObj.longitude,
   }

   const distanceInMeters = getDistance(locationCoords, bizCoords);
   const distanceInMiles = 0.000621371*distanceInMeters;
   // const distanceInMilesDivision = distanceInMeters/1609.34;

   // toFixed function returns strings, so make sure to cast to a float
   if (distanceInMiles > 10) {
      return parseFloat(distanceInMiles.toFixed(0));
   } else {
      return parseFloat(distanceInMiles.toFixed(1));
   }
}

const quickSort = (array) => {
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
export const quickSortBizArr = async (bizArr, currentLocation) => {
   // if (bizArr.length === 1) return bizArr;
   if (bizArr.length <= 1) return bizArr;
   
   const pivotIndex = bizArr.length - 1;
   const pivotBiz = bizArr[pivotIndex];
   const pivotBizDistance = distanceBetweenLocationAndBusiness(currentLocation, pivotBiz.coordinates)

   const leftBizArr = [];
   const rightBizArr = [];
   
   // loop thru every element of array except the last one, which is our pivot
   for (let i=0; i < pivotIndex; i++) {
      let currentBiz = bizArr[i];
      let currentBizDistance = distanceBetweenLocationAndBusiness(currentLocation, currentBiz.coordinates);
      if (currentBizDistance < pivotBizDistance) {
         leftBizArr.push(bizArr[i]);
      } else {
         rightBizArr.push(bizArr[i]);
      }
   }

   // 3 possible cases
   // if (leftBizArr.length > 0 && rightBizArr.length > 0) { // we have two arrays
   //    return [...await quickSortBizArr(leftBizArr, currentLocation), pivotBiz, ...await quickSortBizArr(rightBizArr, currentLocation)];
   //    } else if (leftBizArr.length > 0) { // rightBizArr is empty, we have one arr
   //    return [...await quickSortBizArr(leftBizArr, currentLocation), pivotBiz];
   // } else { // rightBizArr.length > 0 and left is empty
   //    return [pivotBiz, ...await quickSortBizArr(rightBizArr, currentLocation)]
   // }

   // using <= 1 so only one case. make sure to await the func since it is an async func
   return [...await quickSortBizArr(leftBizArr, currentLocation), pivotBiz, ...await quickSortBizArr(rightBizArr, currentLocation)];
}