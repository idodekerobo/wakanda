import React, { useContext } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, TouchableOpacity } from 'react-native'; // have to import TouchableOpacity from here
import { GlobalContext } from '../context/GlobalState';

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

   // using onCalloutPress as workaround since TouchableOpacity onPress isn't working
   const markers = state.bizArr.slice().map(biz => {
      if (state.selectedCategory === 0) {
         return <Marker stopPropagation={false} key={biz._id} coordinate={biz.coordinates} onCalloutPress={props.onCalloutPress}>
            <Callout>
               <TouchableOpacity >
                  <Text>{biz.name}</Text>
                  <Text style={{ color: 'blue' }}>
                     View Restaurant
                  </Text>
               </TouchableOpacity>
            </Callout>
         </Marker>
      } else if (categoryGetter(biz.category) === state.selectedCategory) {
         return <Marker stopPropagation={false} key={biz._id} coordinate={biz.coordinates} onCalloutPress={props.onCalloutPress}>
            <Callout>
               <TouchableOpacity >
                  <Text>{biz.name}</Text>
                  <Text style={{ color: 'blue' }}>
                     View More
                    </Text>
               </TouchableOpacity>
            </Callout>
         </Marker>
      }
   });

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