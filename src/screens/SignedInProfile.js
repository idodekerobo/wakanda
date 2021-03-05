import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import ProfileOverlay from '../components/ProfileOverlay';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BizCard from '../components/BizCard'
import { getUserPinnedBusinesses } from  '../../api/firestore-api'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const biz = [
   {name: 'ocean blue', city: 'Chandler, AZ', visits: 7, },
   {name: 'ATL Wings', city: 'Mesa, AZ', visits: 12, },
   {name: 'Sweetest Season', city: 'Tempe, AZ', visits: 3, },
   {name: 'Lolo\'s Chicken & Waffles', city: 'Phoenix, AZ', visits: 3, },
]

const friendBiz = [
   {friendName: 'sude', name: 'ocean blue', city: 'Chandler, AZ', visits: 7, },
   {friendName: 'imodu', name: 'ATL Wings', city: 'Mesa, AZ', visits: 12, },
   {friendName: 'omuwa', name: 'Sweetest Season', city: 'Tempe, AZ', visits: 3, },
   {friendName: 'omuwa', name: 'Lolo\'s Chicken & Waffles', city: 'Phoenix, AZ', visits: 3, },
]

const initState = [
   {name: '', address: '', desc: '' },
   {name: '', address: '', desc: '' },
]

const SignedInProfile = () => {
   const [ pinnedBusinesses, setPinnedBusinesses ] = useState(initState)

   const onViewMorePress = (e) => {
      console.log('view more press');
   }

   // const el = [0, 12, 3]
   const pinBizCard = pinnedBusinesses.map((el, i) => {
   // const pinBizCard = el.map((el, i) => {
      return <BizCard key={i} name={el.name} address={el.address} description={el.desc}/>
   })

   const pinnedBiz = async () => {
      // TODO -  this only waits if i use auth.currentUser, but the docs say listen on onAuthStateChanged???
      // TODO - work around, make sure user is anonSigned in before running this
      const biz = await getUserPinnedBusinesses(); 
      console.log(`logging from pinnedBiz async function in signedinprofile component ${biz}`);
      setPinnedBusinesses(biz)
      // return biz;
   }

   useEffect(() => {
      pinnedBiz();
   }, [ ])

   return (
      <ImageBackground source={require('../../assets/afe-background-v3.png')} style={{ flex: 1,  resizeMode: 'cover', justifyContent: 'center' }}>
         <SafeAreaView style={styles.container}>
            
            <ScrollView >

            <View style={styles.titleBar}>
               <TouchableOpacity onPress={e => onViewMorePress(e)}>
                  <Feather style={styles.feather} name="more-vertical" size={32} color="white" />
               </TouchableOpacity>
            </View>
            
            <ProfileOverlay />
               <View >
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                     {pinBizCard}
                  </ScrollView>
               </View>

            </ScrollView>
         </SafeAreaView>
      </ImageBackground>
   )
}
export default SignedInProfile;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginBottom: 10,
   },
   titleBar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
   feather: {
      marginRight: 10,
   },
   pinnedBizContainer: {
      marginTop: 40,
      marginLeft: 10,
   },
   pinnedBizHeader: {
      fontFamily: 'AppleSDGothicNeo-UltraLight',
      fontWeight: '300',
      fontSize: 24,
   },
   
   pinnedBizScrollView: {
      // marginTop: 10,
   },
   pinnedBizScrollViewContent: {
      // marginLeft: 'auto',
      marginRight: 'auto',
      // width: '100%',
   },
   pinnedBizElement: {
      // width: '33%',
      flexDirection: 'row',
   },
   pinnedBizElementStats: {
      // width: '23%',
   },
})