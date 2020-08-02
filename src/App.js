import React from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { MapTab } from './screens/Screen-Exports.js';
import { TabNavigator } from './screens/Tab-Navigator';
// import { db, firestore } from '../api/firebase-config';
// import { setData, getData } from '../api/firestore-api';
import * as dbApi from '../api/firestore-api';

// TODO - make the .getLocation() and .getData() methods call while app is loading

export default class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         location: {},
         errorMsg: '',
         bizArr: [],
      }
   }

   getLocation = async () => {
      console.log('function is running')
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         this.setState({
            errorMsg: 'Permission not granted'
         });
      }
      const location =  await Location.getCurrentPositionAsync();
      this.setState({location});
   }

   getData = async () => {
      const bizArr = await dbApi.getAllBusinesses();
      this.setState({bizArr});
   }

   componentDidMount() {
      console.log('==============================================');
      console.log('app running');
      console.log();
      this.getData();
      this.getLocation();
   }

   render() {
      const location = (this.state.location && this.state.location.coords) ? this.state.location.coords : {};
      return (
         <MapTab bizArr={this.state.bizArr} latitude={location.latitude} longitude={location.longitude} />
      );
   }
}