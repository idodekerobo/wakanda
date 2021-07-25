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

   // console.log(searchResults.length);
   const editedArr = await removeBizMoreThan100MilesFromArray(searchResults, location);
   for (let u=0; u < editedArr.length; u++) {
      let biz = editedArr[u];
      console.log(biz['item'].name)
   }
   return editedArr;

   
   // should i cap this at a max of 50 results ??
   // for (let u=0; u < searchResults.length; u++) {
   //    let biz = searchResults[u];
   //    console.log(biz['item'].name)
   // }
   // return searchResults;

   // sort search results by distance
   // const sortedByLocationSearchResults = await quickSortSearchedBizArr(searchResults, location)

   // // should i cap this at a max of 30 results ??
   // for (let u=0; u < sortedByLocationSearchResults.length; u++) {
   //    let biz = sortedByLocationSearchResults[u];
   //    console.log(biz['item'].name)
   // }
   // return sortedByLocationSearchResults;
}

const removeBizMoreThan100MilesFromArray = async (bizArr, currentLocation) => {
   // console.log('starting to parse arr')
   // console.log('from editing function', bizArr.length)
   let newCloseBizArr = [];

   // for (let i=0; i < bizArr.length; i++) {
   for (let i=0; i < 100; i++) {
      // if ( i < 5) {
         let currentBiz = bizArr[i];
         const distance = distanceBetweenLocationAndBusiness(currentLocation, (currentBiz['item'].coordinates) );
         if (distance > 100) return;
         newCloseBizArr.push(bizArr[i]);
      // }
   }

   // console.log('new biz arr length', newCloseBizArr.length);
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