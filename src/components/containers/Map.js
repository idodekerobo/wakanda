import React from 'react';
import MapView, { Marker, CalloutSubview, Callout } from 'react-native-maps';
import { StyleSheet, Text } from 'react-native';

// TODO - import database into arr of markers for restaurants

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

   onButtonPress = () => {
      console.log('yerrrrrr');
   } 
   render() {

      const marker = <Marker coordinate={{latitude: 33.307360, longitude: -111.901600}} image={require('../../../assets/icons8-map-pin-48.png')}>
         <Callout>
            <Text>sldkfn</Text>
         </Callout>
      </Marker>
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
            style={styles.mapStyle}>
                  <Marker coordinate={{latitude: 33.307360, longitude: -111.901600}} image={require('../../../assets/icons8-map-pin-48.png')}>
                     <Callout>
                        <Text>Ocean Blue Caribbean</Text>
                        <Text>Jamaican Restaurant</Text>
                           <Text style={{color: 'blue'}} onPress={this.onButtonPress}>View Restaurant</Text>
                     </Callout>
                  </Marker>
            </MapView>
      );
   }
}