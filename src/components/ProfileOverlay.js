import React from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Avatar, Divider, Image } from 'react-native-elements';
const friends = [
   'OK',
   'IK', 
   'OK', 
   'PK',
   'BY',
   'JW',
   'JBM',

]

let user = {
   firstName: 'Idode',
   lastName: 'Kerobo',
   joinedDate: 'Feb \'21',
}
user = null;
const ProfileOverlay = () => {
   
   const friendsList = friends.map((el, i) => {
      return <View key={i} style={{marginRight: 15}} >
         <Avatar title={el} rounded size="large" overlayContainerStyle={{backgroundColor: 'grey'}} />
      </View>
   })

   let userInfo;
   if (user) {
      userInfo = 
         <View style={styles.containerWrapper}>
            <View style={styles.userInfo}>
               <Avatar title={`${user.firstName[0]}${user.lastName[0]}`} rounded size={108} containerStyle={{ marginTop: -70, marginLeft: 'auto', marginRight: 'auto' }} overlayContainerStyle={{ backgroundColor: 'grey' }} />
               <Text style={styles.nameHeader}>{`${user.firstName} ${user.lastName}`}</Text>

               <View style={styles.statContainer}>
                  <View style={styles.statBox}>
                     <Text style={styles.statLabels}>Joined</Text>
                     <Text style={{ ...styles.statText }}>{user.joinedDate}</Text>
                  </View>
                  {/* <Divider style={{ marginRight: 30, marginLeft: 30, backgroundColor: 'black', height: '90%', width: 1, marginTop: 'auto', marginBottom: 'auto' }} />
                  <View style={styles.statBox}>
                     <Text style={ styles.statLabels }>Friends</Text>
                     <Text style={styles.statText}>{7}</Text>
                  </View> */}
               </View>

               {/* <View style={{flex: 1, marginTop: 0, marginLeft: 15, marginRight: 15,  }}>
                  <ScrollView style={{  marginTop: 10, marginBottom: 10, }} horizontal={true} showsHorizontalScrollIndicator={false}>
                     {friendsList}
                  </ScrollView>
               </View> */}
            </View>
         </View>
   } else {
      userInfo =
         <View style={styles.logoContainer}>
            <Image
               source={require('../../assets/afe-logo-vector.png')}
               style={{ width: 250, height: 250 }}
               PlaceholderContent={<ActivityIndicator size="large" color="#0a431d" />}
            />
         </View>
   }
   
   return (
      <View>
         {userInfo}
      </View>
   )
}

export default ProfileOverlay;

const styles = StyleSheet.create({
   logoContainer: {
      backgroundColor: '#d8e8dd',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 0,
      padding: 0,
   },
   containerWrapper: {
      // backgroundColor: '#DEF1E7',
      // opacity: .7,
      // backgroundColor: 'rgba(222, 241, 231, 0.7)',
      backgroundColor: '#fff',
      borderRadius: 10,
      width: '90%',
      // height: 280,
      // height: 200, // no friend horiz scroll view
      flex: 1,
      marginTop: 40,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 10,

      // shadow
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
   },
   nameHeader: {
      fontFamily: 'HelveticaNeue',
      fontSize: 28,
      fontWeight: '300',
      color: 'black',
      textAlign: 'center',
      marginTop: 5,
   },
   statContainer: {
      marginTop: 20,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'center',
   },
   statBox: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   statText: {
      fontFamily: 'AppleSDGothicNeo-UltraLight',
      fontWeight: '300',
      fontSize: 26, 
      textAlign: 'center',
      marginBottom: 5,
      marginTop: 5,
   },
   statLabels: {
      fontFamily: 'AppleSDGothicNeo-UltraLight',
      fontWeight: '300',
      fontSize: 18
   },
})