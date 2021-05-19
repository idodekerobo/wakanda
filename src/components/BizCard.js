import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import PinnedBizOverlay from './PinnedBizOverlay';
import { Card } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

const categoryIcon = (bizCategory, color, size) => {
   if (bizCategory === 'restaurant') return <FontAwesome5 name="hamburger" size={size} color={color} />
   if (bizCategory === 'cosmetics') return <FontAwesome5 name="paint-brush" size={size} color={color} />;
   if (bizCategory === 'arts') return <FontAwesome5 name="paint-brush" size={size} color={color} />;
   if (bizCategory === 'clothing') return <FontAwesome5 name="tshirt" size={size} color={color} />;
   if (bizCategory === 'technology') return <FontAwesome5 name="microchip" size={size} color={color} />;
   if (bizCategory === 'other') return <FontAwesome5 name="hand-rock" size={size} color={color} />;
}

const BizCard = ({business}) => {
   const { name, streetAddress, city, state, zip, description, hours, tel, website, category, _id } = business

   // const [ visible, setVisible ] = useState(false);
   const [ visible, setVisible ] = useState(false);

   const toggleOverlay = () => {
      setVisible(!visible);
   }

   const onCardPress = (e, business) => {
      toggleOverlay();
   }

   return (
      <TouchableOpacity onPress={(e) => onCardPress(e, business)} style={{flex: 1, margin: 0, padding: 0}}>
         
         <PinnedBizOverlay visible={visible} toggleOverlay={toggleOverlay} business={business}/>

         <Card containerStyle={styles.cardContainer} wrapperStyle={styles.containerWrapper}>
            <View style={styles.iconContainer}>
               {categoryIcon(category, "#064E3B", 24)}
            </View>
            
            <View>
               <Text style={[styles.cardHeader, styles.fontStyle]}>{name}</Text>
               <View style={styles.bizInfoContainer}>
                  <Text style={[styles.cityState, styles.fontStyle]}>{streetAddress}, {city}, {state} {zip}</Text>
                  {/* <Text style={[styles.visitStat, styles.fontStyle]}>{3} visits</Text> */}
               </View>
            </View>
         </Card>
      </TouchableOpacity>
   );
}
export default BizCard;

const styles = StyleSheet.create({
   cardContainer: {
      flex: 1,
      marginTop: 0,
      marginBottom: 15,
      // height: 320,
      // width: 250, // use a static height/width, not a percentage height/width
      borderRadius: 15,
      borderWidth: 0,
      // borderColor: 'lightgrey',
      borderColor: '#fff',
      backgroundColor: '#fff',
      // borderColor: '#ECFDF5',
      // backgroundColor: '#ECFDF5',
      // backgroundColor: '#d8e8dd',
      // backgroundColor: '#0a431d',

      // shadow
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
   },
   containerWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
   },
   iconContainer: {
      marginRight: 3,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#d8e8dd',
      // backgroundColor: '#D1FAE5',
      height: '100%',
      width: 60,
      borderRadius: 35,
   },
   cardHeader: {
      textAlign: 'left',
      marginBottom: 5,
   },
   bizInfoContainer: {
      flex: 1,
      marginTop: 2,
      flexDirection: 'column',
      justifyContent: 'flex-end',
   },
   description: {
      marginTop: 4,
   },
   cityState: {
      marginTop: 3,
      flexShrink: 1,
      flexWrap: 'wrap',
   },
   visitStat:{
      fontSize: 17,
      fontWeight: 'bold'
   },
   fontStyle: {
      // color: 'black',
      // color: '#0a431d',
      color: '#064E3B',
   },
})