import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; // have to import TouchableOpacity from here

const styles = StyleSheet.create({
   mapStyle: {
      position: 'absolute',
      height: '100%',
      width: '100%',
   },
   viewStyle: {
      backgroundColor: 'transparent',
   },
});

export default class Map extends React.Component {
   constructor(props) {
      super(props);
      // this.onButtonPress = this.onButtonPress.bind(this);
   }
   componentDidMount() {

   }

   // THIS FUNCTION ISN'T FIRING IN THE ONPRESS HANDLER OF TEXT OR TOUCHABLE OPACITY
   onButtonPress = () => {
      console.log('view more press in marker of location');
   }

   // this works
   onMarkerPress = (e) => {
      console.log('is this shit working');
      console.log('marker press: ', e.nativeEvent);
   }

   render() {
      const markers = this.props.bizArr.slice().map(biz => (
         <Marker key={biz._id} coordinate={biz.coordinates} onPress={this.onMarkerPress} >
            <Callout>
                  <Text>{biz.name}</Text>
                  <TouchableOpacity onPress={this.onButtonPress} >
                     <Text style={{color: 'blue'}} >
                        View Restaurant
                     </Text>
                  </TouchableOpacity>
            </Callout>
         </Marker>
      ));

      return (         
         <MapView 
            onPress={this.props.onPress}
            compassOffset={{x: -10,y: 65}}
            initialRegion={{
               latitude: 5,
               longitude: 20,
               latitudeDelta: 180,
               longitudeDelta: 180,
            }}
            showsUserLocation={true}
            region={this.props.region}
            style={styles.mapStyle}>
                  {/* https://icons8.com/license */}
                  {markers}
            </MapView>
      );
   }
}
/*
<Marker coordinate={{latitude: 33.307360, longitude: -111.901600}} image={require('../../../assets/icons8-map-pin-48.png')}>
   <Callout>
      <Text>Ocean Blue Caribbean</Text>
      <Text>Jamaican Restaurant</Text>
      <Text style={{color: 'blue'}} onPress={this.props.viewMore}>View Restaurant</Text>
   </Callout>
</Marker>
*/