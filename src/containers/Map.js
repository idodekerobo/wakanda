import React, { useContext } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, TouchableOpacity } from 'react-native'; // have to import TouchableOpacity from here
import { GlobalContext } from '../context/GlobalState';
import { storage } from '../../api/firebase-config'

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


const categoryGetter = (bizCategory) => {
   if (bizCategory === 'restaurant') return 1;
   if (bizCategory === 'cosmetics') return 2;
   if (bizCategory === 'arts') return 3;
   if (bizCategory === 'clothing') return 3;
   if (bizCategory === 'technology') return 4;
   if (bizCategory === 'other') return 4;
}


const Map = React.forwardRef((props,mapRef) => {
   const { state } = useContext(GlobalContext);

   function takeSnapshot(coordinates, bizId) {
      if (!coordinates || !bizId) return; // don't do anything while data is loading
      const { latitude, longitude } = coordinates;
      const name = `${bizId}.png`;
      console.log(`first file name: ${name}, coordinates: ${latitude}, ${longitude}}`)

      const snapshot = mapRef.current.takeSnapshot({
         width: 300,      // optional, when omitted the view-width is used
         height: 300,     // optional, when omitted the view-height is used
         region: { // iOS only, optional region to render
            latitude,
            longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
         }, 
         format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
         quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
         result: 'file'   // result types: 'file', 'base64' (default: 'file')
      });
      snapshot.then(url => {
         // need to pass this url into firebase storage
         console.log(`took screenshot`);
         console.log(`screenshot url: ${url}`);

      })
   }
   
   // using onCalloutPress as workaround since TouchableOpacity onPress isn't working
   let markers;
   if ((state.bizArr !== undefined) && (state.bizArr !== null)) {
      markers = state.bizArr.slice().map((biz, i) => {
         if (state.selectedCategories.includes(0)) {
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