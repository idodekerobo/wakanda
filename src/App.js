import React from 'react';
// import CREDENTIALS from './credentials'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { HomeScreen } from './components/screens/screens.js';
// import { db, firestore } from '../api/firebase-config';
// import { setData, getData } from '../api/firestore-api';
import * as dbApi from '../api/firestore-api';

export default class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         location: {},
         errorMsg: ''
      }
   }

   getLocation = async () => {
      console.log('function is running')
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         console.log('Permission not granted');
         this.setState({
            errorMsg: 'Permission not granted'
         });
      }

      const location =  await Location.getCurrentPositionAsync();
      this.setState({location});
      console.log('ran get location funciton yessir');
   }

   componentDidMount() {
      console.log('app running');
      this.getLocation();
      dbApi.getData();
   }

   render() {

      const location = (this.state.location && this.state.location.coords) ? this.state.location.coords : {};
      return (
         <HomeScreen latitude={location.latitude} longitude={location.longitude} />
      );
   }
}