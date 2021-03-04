import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Card, Image, Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
// don't need this anymore
const pinnedBiz = [
   {
      name: 'Andy\'s Shoe Shine & Repair',
      description: 'Shoe shines, repairs, and supplies. Andy and Grace have been operating in downtown Phoenix for over 13 years.',
      city: 'Phoenix',
      state: 'Arizona',
      numVisits: 1,
   },
]

const BizCard = ({name, address, description}) => {
   const [ source, setSource ] = useState({uri: 'https://via.placeholder.com/150'})
   const [ height, setHeight ] = useState(null)
   const [ width, setWidth ] = useState(null);

   const onCardPress = (e) => {
      console.log('on card press')
   }

   useEffect(() => {
      /*
      Image.getSize(source, (imageWidth, imageHeight) => {
         if (!height) {
            setHeight((imageHeight * (300 / imageWidth)))
         }
      })
      */
   })

   return (
      // implemented without image with header
      <TouchableOpacity onPress={e => onCardPress(e)} style={{flex: 1}}>
         <Card containerStyle={styles.cardContainer} wrapperStyle={styles.containerWrapper}>
               {/* <Image resizeMode="cover" style={styles.imageStyle} source={{uri: 'https://via.placeholder.com/150'}} PlaceholderContent={<ActivityIndicator />}/> */}
               <Image resizeMode="cover" style={{marginBottom: 10, width: '100%', height: 200}} source={{uri: 'https://via.placeholder.com/150'}} PlaceholderContent={<ActivityIndicator />}/>
               <Text style={styles.cardHeader}>{name}</Text>
               <Divider style={{backgroundColor: 'black', width: '100%', marginRight: 'auto', marginLeft: 'auto'}} />
               <View style={styles.bizInfoContainer}>
                  <Text style={styles.cityState}>{address}</Text>
                  <Text>{3} visits</Text>
               </View>

            </Card>
         </TouchableOpacity>
   );
}
export default BizCard;

const styles = StyleSheet.create({
   cardContainer: {
      flex: 1,
      height: 320,
      width: 250, // use a static height/width, not a percentage height/width
      borderRadius: 5,
      borderColor: 'lightgrey',
   },
   containerWrapper: {
      flex: 1,
   },
   /*
   imageStyle: {
      // margin: 0,
      // padding: 0,
      width: '100%',
      // height: 100,
      // width: undefined,
      flex: 1,
      marginBottom: 10,
   },
   */
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
   },
})