import React, { useContext } from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Text, TouchableOpacity } from 'react-native'; // have to import TouchableOpacity from here
import { GlobalContext } from '../context/GlobalState';

const MapMarkers = ({ biz, onCalloutPress }) => {
   const { state } = useContext(GlobalContext);

   if (state.pinnedBusinessIds.includes(biz._id)) {
      return (
         <Marker image={require('../../assets/Star_Pin-03-smallest.png')} stopPropagation={false} coordinate={(biz.coordinates) ? {latitude: biz.coordinates.latitude, longitude: biz.coordinates.longitude} : dummyCoordinates} onCalloutPress={onCalloutPress} pinColor="#0a431d">
            <Callout key={biz._id}>
               <TouchableOpacity >
                  <Text>{biz.name}</Text>
                  <Text style={{ color: '#0a431d' }}>View More</Text>
               </TouchableOpacity>
            </Callout>
         </Marker>
      );
   }
   
   return (
      <Marker stopPropagation={false} coordinate={(biz.coordinates) ? { latitude: biz.coordinates.latitude, longitude: biz.coordinates.longitude } : dummyCoordinates} onCalloutPress={onCalloutPress} pinColor="#0a431d">
         <Callout key={biz._id}>
            <TouchableOpacity >
               <Text>{biz.name}</Text>
               <Text style={{ color: '#0a431d' }}>View More</Text>
            </TouchableOpacity>
         </Callout>
      </Marker>
   );
}
export default MapMarkers;