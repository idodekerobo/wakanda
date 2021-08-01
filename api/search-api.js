import Fuse from 'fuse.js'
import { getDistance } from 'geolib';

// export const searchObjectArray = (objArr, keywordSearchString) => {
export const searchObjectArray = async (objArr, keywordSearchString, location) => {
   const options = {
      includeScore: true,
      // search in these properties of the object
      keys: [
         {
            name: 'name',
            weight: 0.4
         },
         {
            name: 'taggedKeywords',
            weight: 0.4
         },
         {
            name: 'category',
            weight: 0.2
         }
      ]
   }

   const fuseSearchInstance = new Fuse(objArr, options)

   const searchResults = fuseSearchInstance.search(keywordSearchString);

   const editedArr = await removeBizMoreThan150MilesFromArray(searchResults, location);
   return editedArr;
}

const removeBizMoreThan150MilesFromArray = async (bizArr, currentLocation) => {
   let newCloseBizArr = [];
   for (let i=0; i < bizArr.length; i++) {
      if (i > bizArr.length-1) break; // checking to see if the loop tries to iterate longer than the actual bizArr
      let currentBiz = bizArr[i];
      const currentBizLocation = currentBiz['item'].coordinates;
      const distance = distanceBetweenLocationAndBusiness(currentLocation, currentBizLocation);
      if (distance < 150) {
         newCloseBizArr.push(bizArr[i]);
      }
   }
   return newCloseBizArr;
}

const distanceBetweenLocationAndBusiness = (currentLocation, bizLocationObj) => {
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

const quickSortSearchedBizArr = async (bizArr, currentLocation) => {
   // if (bizArr.length === 1) return bizArr;
   if (bizArr.length <= 1) return bizArr;
   
   const pivotIndex = bizArr.length - 1;
   const pivotBiz = bizArr[pivotIndex];
   const pivotBizDistance = distanceBetweenLocationAndBusiness(currentLocation, pivotBiz['item'].coordinates)

   const leftBizArr = [];
   const rightBizArr = [];
   
   // loop thru every element of array except the last one, which is our pivot
   for (let i=0; i < pivotIndex; i++) {
      let currentBiz = bizArr[i];
      let currentBizDistance = distanceBetweenLocationAndBusiness(currentLocation, currentBiz['item'].coordinates);
      if (currentBizDistance < pivotBizDistance) {
         leftBizArr.push(bizArr[i]);
      } else {
         rightBizArr.push(bizArr[i]);
      }
   }

   // using <= 1 so only one case. make sure to await the func since it is an async func
   return [...await quickSortSearchedBizArr(leftBizArr, currentLocation), pivotBiz, ...await quickSortSearchedBizArr(rightBizArr, currentLocation)];
}