import React from 'react';
import { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

const styles = {

}

export default class Pin extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   componentDidMount() {

   }
   render() {
      return (       
         <Marker
            coordinate={{latitude: 33.3288581293983, longitude: -111.9571214756541}}
            image={require('../../../assets/icons8-map-pin-48.png')}
         />
      );
   }
}