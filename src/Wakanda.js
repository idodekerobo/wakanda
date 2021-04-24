import React from 'react';
import { AppLoading } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import TabNavigator from './screens/Tab-Navigator';
import { signInAnon, getAllBusinesses, getBusinessesOfState } from '../api/firestore-api';
import { fetchGoogleMapsApi, convertGoogleMapsApiResponseToState } from '../api/google-maps-api';
import { sortBizArr } from '../api/functions';

// global state
import { GlobalContext } from './context/GlobalState';

export default class Wakanda extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isReady: false,
         errorMsg: '',
      }
   }
   static contextType = GlobalContext;

   getLocation = async (fetchDataFunction) => {
      console.log('get location function is running')
      const { dispatch } = this.context;
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         this.setState({
            errorMsg: 'Permission not granted'
         });
      }
      const location =  await Location.getCurrentPositionAsync();
      dispatch({type: 'GET_LOCATION', location})

      // console.log(location);  
      fetchDataFunction(location);
   }
   
   // TODO - edit this to load businesses in your zip code. it should run after you get users location
   getData = async (location) => {
      const { dispatch } = this.context;
      const fetchBizArr = await getAllBusinesses();

      // sort the biz array
      // const location =  await Location.getCurrentPositionAsync();
      const sortedBizArr = await sortBizArr(fetchBizArr, location);

      // dispatch({type: 'FETCH_BIZ_DATA', arr: fetchBizArr});
      dispatch({type: 'FETCH_BIZ_DATA', arr: sortedBizArr});


      // get data for state user is in;
      const latlngString = `${location.coords.latitude}, ${location.coords.longitude}`;
      const googleMapsResponse = await fetchGoogleMapsApi(latlngString);
      const usersState = await convertGoogleMapsApiResponseToState(googleMapsResponse);
      const stateBizArr = await getBusinessesOfState(usersState);
      console.log(stateBizArr)
   }

   // sorts the businesses
   sortData = async () => {
      const { dispatch } = this.context;
      const fetchBizArr = await getAllBusinesses();
      const location =  await Location.getCurrentPositionAsync();
      const sortedBizArr = await sortBizArr(fetchBizArr, location);
      dispatch({type: 'FETCH_BIZ_DATA', arr: sortedBizArr});
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

   componentDidMount() {
      console.log('==============================================');
      console.log('app running');
      console.log();
      // this.sortData();
      // this.getStatesBusinesses('Arizona');
      // this.getStatesBusinesses('Texas');
      // this.getCurrentState();
   }

   appLoadingFunc = () => {
      this.getLocation(this.getData);
      signInAnon();
      // this.getData();
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
      } else {
         return (
            <TabNavigator />
         );
      }     
   }
}