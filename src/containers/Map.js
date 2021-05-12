import React, { useContext, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MapMarkers } from '../components/Component-Exports';
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

   const dummyCoordinates = {
      latitude: 6.5480357,
      longitude: 3.1438688,
   }
   
   // using onCalloutPress as workaround since TouchableOpacity onPress isn't working
   let markers;
   if ((state.bizArr !== undefined) && (state.bizArr !== null)) {
      markers = state.bizArr.slice().map((biz, i) => {
         if (state.selectedCategories.includes(0)) {
            // TODO - figure out how to get stars only for favorites and have a star icon that differentiates favs on the map
            return <MapMarkers key={`${biz._id}${i}`} i={i} biz={biz} onCalloutPress={props.onCalloutPress} />
         } else if (state.selectedCategories.includes(categoryGetter(biz.category))) {
            return <MapMarkers key={`${biz._id}${i}`} i={i} biz={biz} onCalloutPress={props.onCalloutPress} />
         }
      });
   }
   useEffect(() => {
      // passing in the empty array allows this to only re-renders when that arr changes otherwise it re-renders whenever you drag the map
      
      // console.log();
      console.log('rendering map');
      // console.log(state.location);
      // console.log();
      // UPDATE - only updating when the user's latitude, longitude coords change
         // fine as long as there's no lag from state updates
   }, [ state.location.coords.latitude, state.location.coords.longitude ]) 
   // }) 

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