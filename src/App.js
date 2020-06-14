import React from 'react';
// import CREDENTIALS from './credentials'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { HomeScreen } from './components/screens/screens.js';

export default class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         location: {},
         errorMsg: ''
      }
      // this.getLocation = this.getLocation.bind(this);
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
   }

   componentDidMount() {
      // this.findCurrentLocation();
      this.getLocation();
   }

   render() {
      return (
         <HomeScreen location={JSON.stringify(this.state.location)} />
         // <Text></Text>
      );
   }
}