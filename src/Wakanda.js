import React from 'react';
// import { AppLoading } from 'expo';
import AppLoading from 'expo-app-loading';
import * as Location from 'expo-location';
import TabNavigator from './screens/Tab-Navigator';
import { signInAnon, getAllBusinesses, getBusinessesOfState, getUserPinnedBusinessIdArr, getStarPinImageFromFb } from '../api/firestore-api';
import { fetchGoogleMapsApi, convertGoogleMapsApiResponseToState } from '../api/google-maps-api';
import { quickSortBizArr } from '../api/functions';

// global state
import { GlobalContext } from './context/GlobalState';
import { GET_LOCATION, FETCH_BIZ_DATA, SET_PINNED_BUSINESS_ID_ARR, FETCH_STAR_PIN } from './context/ActionCreators';

function cacheImages(images) {
   return images.map(image => {
      if (typeof image === 'string') {
         return Image.prefetch(image);
      } else {
         return Asset.fromModule(image).downloadAsync();
      }
   });
}

export default class Wakanda extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isReady: false,
         errorMsg: '',
      }
   }
   static contextType = GlobalContext;

   getLocationForAppLoad = async (fetchDataFunction) => {
      // console.log('get location function is running')
      const { dispatch } = this.context;
      // const { status } = await Location.requestBackgroundPermissionsAsync();
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
         this.setState({
            errorMsg: 'Permission not granted'
         });
         alert('Location permission is required for Afe to work properly! Please enable location if you\'d like to use the app.');
         return;
      }
      
      // const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High, }); // takes ~10 seconds in this version of expo sdk accurate w/in 10 meters
      // takes 2-3 seconds in this version of expo sdk, accurate within 100 meters
      // const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, }); 
      
      // get last known position and await it so the app has a location object to work with 
      // and it doesn't slow down app start up
      let location = await Location.getLastKnownPositionAsync({ accuracy: Location.Accuracy.High, });
      
      // if no last known location, get current position
      if (!location) { 
         // console.log('location is falsy (null or undefined)');
         location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced, });
      }
      
      // console.log(`location from the wakanda object on app loading`);
      dispatch({type: GET_LOCATION, location})

      await fetchDataFunction(location);
      // don't await this so the app loads a bit faster
      // fetchDataFunction(location);
   }

   // update app to more accurate location
   getMostAccurateLocation = async () => {
      const { dispatch } = this.context;
      const updatedLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, });
      // const updatedLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation, });
      dispatch({type: GET_LOCATION, location: updatedLocation})
   }
   
   // TODO - edit this to load businesses in your zip code. it should run after you get users location
   getData = async (location) => {
      const { dispatch } = this.context;
      const fetchBizArr = await getAllBusinesses();

      // sort the biz array
      const sortedBizArr = await quickSortBizArr(fetchBizArr, location);
      dispatch({type: FETCH_BIZ_DATA, arr: sortedBizArr})
      /*
      found: object with keys {_U, _V, _W, _X})
      ^this error means its returning a promise. not an array^
      */


      // TODO - get data for state user is in;
      // const latlngString = `${location.coords.latitude}, ${location.coords.longitude}`;
      // const googleMapsResponse = await fetchGoogleMapsApi(latlngString);
      // const usersState = await convertGoogleMapsApiResponseToState(googleMapsResponse);
      // const stateBizArr = await getBusinessesOfState(usersState);
      // console.log(stateBizArr)
   }

   // sorts the businesses
   sortData = async () => {
      const { dispatch } = this.context;
      const fetchBizArr = await getAllBusinesses();
      const location =  await Location.getCurrentPositionAsync();
      const sortedBizArr = await quickSortBizArr(fetchBizArr, location);
      dispatch({type: FETCH_BIZ_DATA, arr: sortedBizArr});
   }

   getCurrentState = async () => {
      const campesinoLatLng = '29.746115771150023,-95.39420396098438';
      const googleMapsResponse = await fetchGoogleMapsApi(campesinoLatLng);
      const state = await convertGoogleMapsApiResponseToState(googleMapsResponse);
      console.log(state);
   }

   getStatesBusinesses = async (state) => {
      const azBizArr = await getBusinessesOfState(state);
      console.log(azBizArr);
   }

   loadPinnedBusinessIds = async () => {
      const { dispatch } = this.context;
      const pinnedBusinessIds = await getUserPinnedBusinessIdArr();
      dispatch({type: SET_PINNED_BUSINESS_ID_ARR, pinnedBusinessIds});
   }

   fetchStarPinImage = async () => {
      const { dispatch } = this.context;
      const starPinUrl = await getStarPinImageFromFb();
      dispatch({type: FETCH_STAR_PIN, starPinUrl})
   }

   appLoadingFunc = async () => {  
      // ================================== //
      // NEED TO RUN SIGN IN ANON FIRST BEFORE FETCHING DATA.
      // SO NEW ACCOUNTS CAN BE AUTHENTICATED
      await signInAnon(); 
      // ================================== //

      await this.fetchStarPinImage();
      await this.getLocationForAppLoad(this.getData);
      await this.loadPinnedBusinessIds();
      this.getMostAccurateLocation();
   }
   componentDidMount() {
      // console.log('==============================================');
      // console.log('app running');
      // console.log();
   }

   render() {
      if (!this.state.isReady) {
         return (
            <AppLoading
               startAsync={this.appLoadingFunc}
               onFinish={() => this.setState({isReady: true})}
               onError={console.warn}
            />
         );
      } 
      return (
         <TabNavigator />
      );
   }
}