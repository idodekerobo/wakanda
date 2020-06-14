import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const styles = StyleSheet.create({
   mapStyle: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
   },
});

export default class Map extends React.Component {

   constructor(props) {
      super(props);
      this.state = {

      }
   }

   
   render() {
      return (            
         <MapView 
            initialRegion={{
               latitude: 33.3255288,
               longitude: -111.9641728,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.00421,
            }}
            style={styles.mapStyle}
         />
      );
   }
}