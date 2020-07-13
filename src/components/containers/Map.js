import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; // have to import TouchableOpacity from here

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
   },
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
      this.state = {

      }
      this.region = this.props.region;
      this.map = React.createRef();
      
   }

   componentDidMount() {
   }

   animateToMethod(region) {
      this.map.current.animateToRegion(region);
   }

   render() {
      const markers = this.props.bizArr.slice().map(biz => (
         // using onCalloutPress as workaround since TouchableOpacity onPress isn't working
         <Marker stopPropagation={false} key={biz._id} coordinate={biz.coordinates} onCalloutPress={this.props.onCalloutPress}>
            <Callout>
                  <TouchableOpacity >
                        <Text>{biz.name}</Text>
                        <Text style={{color: 'blue'}}>
                           View Restaurant
                        </Text>
                  </TouchableOpacity>
            </Callout>
         </Marker>
      ));

      return (         
         <MapView
            ref={this.map}
            onPress={this.props.onPress}
            initialRegion={this.props.region}
            compassOffset={{x: -10,y: 65}}
            onRegionChangeComplete={this.props.onRegionChangeComplete}
            showsUserLocation={true}
            style={styles.mapStyle}>
                  {/* https://icons8.com/license */}
                  {markers}
            </MapView>
      );
   }
}