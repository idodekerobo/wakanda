import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { ProfileOverlay, BizCard } from '../components/Component-Exports';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { db } from '../../api/firebase-config';
import { getCurrentAuthUser, getUserPinnedBusinesses } from  '../../api/firestore-api'

const ProfileScreen = () => {
   const [ pinnedBusinesses, setPinnedBusinesses ] = useState([])

   const onFeatherPress = (e) => {
      console.log('view more press');
   }

   const pinBizCard = pinnedBusinesses.map((el, i) => {
      return <BizCard key={i} business={el} />
   })

   const pinnedBizHeader = ((pinnedBusinesses) && (pinnedBusinesses.length > 0)) ? <Text style={styles.pinnedBizHeader}>Your Pinned Businesses</Text> : <Text style={styles.pinnedBizHeader}>Your Pinned Businesses Will Go Here</Text>

   const getPinnedBiz = async () => {
      // TODO -  this only waits if i use auth.currentUser, but the docs say listen on onAuthStateChanged???
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

      // don't return this because it causes component to unmount? getting warning can't perform react state upd on unmounted component
         // stop listening for updates when no longer required
         // return () => subscriber();
   }

   useEffect(() => {
      watchUserObject();
   }, [ ])

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView >

            <View style={styles.titleBar}>
               <TouchableOpacity onPress={e => onFeatherPress(e)}>
                  <Feather style={styles.feather} name="more-vertical" size={32} color="white" />
               </TouchableOpacity>
            </View>
            
            <ProfileOverlay />

            <View >
               {pinnedBizHeader}
               <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} >
                  {(pinnedBusinesses) ? pinBizCard : null}
               </ScrollView>
            </View>

         </ScrollView>
      </SafeAreaView>
   )
}
export default ProfileScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // marginBottom: 10,
      backgroundColor: '#d8e8dd',
      // backgroundColor: '#fff',
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
      marginTop: 8,
      marginRight: 0,
      marginBottom: 10,
      // fontFamily: 'AppleSDGothicNeo-UltraLight',
      fontFamily: 'HelveticaNeue',
      fontWeight: '300',
      fontSize: 24,
   },
})