import React, { useContext } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'; // have to import TouchableOpacity from here
import { GlobalContext } from '../context/GlobalState';
import { categoryGetter } from '../../api/functions';

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

const Map = React.forwardRef((props,mapRef) => {
   const { state } = useContext(GlobalContext);
   
   // using onCalloutPress as workaround since TouchableOpacity onPress isn't working
   let markers;
   if ((state.bizArr !== undefined) && (state.bizArr !== null)) {
      markers = state.bizArr.slice().map((biz, i) => {
         if (state.selectedCategories.includes(0)) {
            // TODO - figure out how to get stars only for favorites and have a star icon that differentiates favs on the map
            // return <Marker image={require('../../assets/star.png')} stopPropagation={false} key={`${biz._id}${i}`} coordinate={biz.coordinates} onCalloutPress={props.onCalloutPress} pinColor="#0a431d">
            return <Marker stopPropagation={false} key={`${biz._id}${i}`} coordinate={biz.coordinates} onCalloutPress={props.onCalloutPress} pinColor="#0a431d">
               <Callout key={biz._id}>
                  <TouchableOpacity >
                     <Text>{biz.name}</Text>
                     <Text style={{ color: '#0a431d' }}>
                        View More
                     </Text>
                  </TouchableOpacity>
               </Callout>
            </Marker>
         } else if (state.selectedCategories.includes(categoryGetter(biz.category))) {
            return <Marker stopPropagation={false} key={`${biz._id}${i}`} coordinate={biz.coordinates} onCalloutPress={props.onCalloutPress} pinColor="#0a431d">
               <Callout key={biz._id}>
                  <TouchableOpacity >
                     <Text>{biz.name}</Text>
                     <Text style={{ color: '#0a431d' }}>
                        View More
                       </Text>
                  </TouchableOpacity>
               </Callout>
            </Marker>
         }
      });
   }

   return (
      <MapView
         ref={mapRef}
         onPress={props.onPress}
         compassOffset={{ x: -10, y: 65 }}
         onRegionChangeComplete={props.onRegionChangeComplete}
         showsUserLocation={true}
         style={styles.mapStyle}>
      {/* https://icons8.com/license */}
            {markers}
      </MapView>
   );
});
export default Map;