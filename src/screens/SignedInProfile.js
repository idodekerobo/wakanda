import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Divider } from 'react-native-elements';
import ProfileOverlay from '../components/ProfileOverlay';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BizCard from '../components/BizCard'
import { db } from '../../api/firebase-config';
import { getCurrentAuthUser, getUserPinnedBusinesses } from  '../../api/firestore-api'

const SignedInProfile = () => {
   const [ pinnedBusinesses, setPinnedBusinesses ] = useState([])

   const onViewMorePress = (e) => {
      console.log('view more press');
   }

   const pinBizCard = pinnedBusinesses.map((el, i) => {
      return <BizCard key={i} name={el.name} address={el.address} description={el.desc}/>
   })

   const pinnedBizHeader = ((pinnedBusinesses) && (pinnedBusinesses.length > 0)) ? <Text style={styles.pinnedBizHeader}>Your Pinned Businesses</Text> : <Text style={styles.pinnedBizHeader}>Your Pinned Businesses Will Go Here</Text>

   const getPinnedBiz = async () => {
      // TODO -  this only waits if i use auth.currentUser, but the docs say listen on onAuthStateChanged???
      // TODO - work around, make sure user is anonSigned in before running this
      const biz = await getUserPinnedBusinesses(); 
      if (biz) setPinnedBusinesses(biz);
   }

   const getUserUid = async () => {
      const currentUser = await getCurrentAuthUser(); 
      return currentUser.uid;
   }

   const watchUserObject = async () => {
      const currentUserUid = await getUserUid();
      // https://stackoverflow.com/a/61468950/9352841
      const subscriber = db
         .collection("users")
         .doc(currentUserUid)
         .onSnapshot(snapshot => {
            // TODO - optimize this to pass in user uid directly since you get it earlier in functoin and not re-read it from database
            getPinnedBiz();
         })

      // stop listening for updates when no longer required
      return () => subscriber();
   }

   useEffect(() => {
      watchUserObject();
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
                  {pinnedBizHeader}
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                     {(pinnedBusinesses) ? pinBizCard : null}
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
   pinnedBizHeader: {
      marginLeft: 15,
      // fontFamily: 'AppleSDGothicNeo-UltraLight',
      fontFamily: 'HelveticaNeue',
      fontWeight: '300',
      fontSize: 24,
   },
})