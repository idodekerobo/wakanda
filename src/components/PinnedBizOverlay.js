import React from 'react';
import BizActionButton from "./BizActionButton";
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { removePinnedBusinessFromProfile } from '../../api/firestore-api';
import { openURL } from 'expo-linking';
import openMap from 'react-native-open-maps';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OverlayChildren = ({ toggleOverlay, business }) => {
   const { name, address, streetAddress, city, state, zip, desc, hours, tel, website, category, coordinates, _id } = business

   const callBusiness = (tel) => {
      if (tel === undefined || tel === '') return;
      openURL(`tel:${tel}`).catch(e => console.log(e));
   }

   const openInMaps = (coordinates, name) => {
      if (coordinates === undefined || coordinates === '') return;
      openMap({ coordinates, query: name });
   }

   const visitWebsite = (webAddress) => {
      if (webAddress === undefined || webAddress === '') return;
      openURL(webAddress).catch(e => console.log(e));;
   }
   
   const removePin = (bizId) => {
      if (bizId === undefined || bizId === '') return;
      console.log(`remove ${bizId} pin`);
      removePinnedBusinessFromProfile(bizId);
      toggleOverlay();
   }
   
   const checkInactive = (element) => {
      if ( element === '' || element === undefined ) return false
      return true;
   }

   return (
   <View style={styles.viewContainer}>
      <Text style={styles.headerText}>{name}</Text>
      <View style={styles.bodyContainer}>
         <Text style={styles.bizDetails}>{streetAddress}, {city}, {state}, {zip}</Text>
         <Text style={styles.bizDetails}>{desc}</Text>
         <Text style={styles.bizDetails}>{hours}</Text>
      </View>

      <View style={styles.actionButtonContainer}>
         <BizActionButton inactive={checkInactive(tel)} action={callBusiness.bind(this, tel)} logo={<Feather name="phone-call" size={22} color="white" />} />
         <BizActionButton inactive={checkInactive(coordinates)} action={openInMaps.bind(this, coordinates, name )} logo={<FontAwesome5 name="directions" size={22} color="white" />}/>
         <BizActionButton inactive={checkInactive(website)} action={visitWebsite.bind(this, website)} logo={<AntDesign name="earth" size={22} color="white" />} />
         <BizActionButton inactive={true} action={removePin.bind(this, _id)} logo={<MaterialCommunityIcons name="pin-off" size={22} color="white" />} />
      </View>
      <Button title="Close" onPress={toggleOverlay} containerStyle={styles.buttonContainerStyle} buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitleStyle} />
   </View>
   )
}

const PinnedBizOverlay = ({visible, toggleOverlay, business}) => {
   return (
      <Overlay children={<OverlayChildren toggleOverlay={toggleOverlay} business={business} />} isVisible={visible} overlayStyle={styles.overlayStyle} />
   )
}
export default PinnedBizOverlay;

const styles = StyleSheet.create({
   overlayStyle: {
      width: '90%',
      height: '65%',
      padding: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   },
   viewContainer: {
      flex: 1,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',     
   },
   headerText: {
      marginTop: 50,
      fontSize: 28,
      width: '80%',
      textAlign: 'center',
      fontWeight: '300',
      color: "#0a431d",
   },
   bodyContainer: {
      flex: 1,
      width: '75%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   bizDetails: {
      color: "#0a431d",
      fontSize: 18,
      fontWeight: '300',
      textAlign: 'center',
      marginBottom: 25,
   },
   actionButtonContainer: {
      width: '80%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 30,
   },
   buttonContainerStyle: {
      alignItems: 'center',
      width: '100%',
      marginBottom: 30,
   },
   buttonStyle: {
      width: '80%',
      textAlign: 'center',
      backgroundColor: "#0a431d",
   },
   buttonTitleStyle: {
      flex: 1,
      fontSize: 24,
      fontWeight: '500',
   },
})