import React, { useContext } from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Text, TouchableOpacity, Image } from 'react-native'; // have to import TouchableOpacity from here
import { GlobalContext } from '../context/GlobalState';

const MapMarkers = ({ biz, onCalloutPress }) => {
   const { state } = useContext(GlobalContext);
   
   const dummyCoordinates = {
      latitude: 6.5480357,
      longitude: 3.1438688,
   }

   // const imageSource = <Image style={{width: 50, height: 50}} source={{uri: '../assets/star-pin'}} />;
   // const imageString = '../../assets/Star_Pin-03-final.png'
   const imageString = '../assets/Star_Pin-03-final.png';
   if (state.pinnedBusinessIds.includes(biz._id)) {
      return (
         // <Marker image={<Image style={{width: 50, height: 50}} source={{uri: '../assets/star-pin'}} />} stopPropagation={false} coordinate={(biz.coordinates) ? {latitude: biz.coordinates.latitude, longitude: biz.coordinates.longitude} : dummyCoordinates} onCalloutPress={onCalloutPress} pinColor="#0a431d">
         <Marker image={require(imageString)} stopPropagation={false} coordinate={(biz.coordinates) ? {latitude: biz.coordinates.latitude, longitude: biz.coordinates.longitude} : dummyCoordinates} onCalloutPress={onCalloutPress} pinColor="#0a431d">
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