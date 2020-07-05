import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

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
   }
   componentDidMount() {

   }

   onButtonPress = () => {
      console.log('yerrrrrr');
   }

   render() {
      const markers = this.props.bizArr.slice().map(biz => (
         <Marker key={biz._id} coordinate={biz.coordinates}  >
            <Callout>
               <Text>{biz.name}</Text>
               {/* <Text>Jamaican Restaurant</Text> */}
               <Text style={{color: 'blue'}} onPress={this.props.viewMore}>View Restaurant</Text>
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