import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   mapStyle: {
      position: 'absolute',
      height: '100%',
      width: '100%',
   },
});

export default class Map extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   componentDidMount() {

   }
   render() {
      return (         
         <MapView 
            initialRegion={{
               latitude: 5,
               longitude: 20,
               latitudeDelta: 180,
               longitudeDelta: 180,
            }}
            showsUserLocation={true}
            region={this.props.region}
            style={styles.mapStyle}
         />
      );
   }
}