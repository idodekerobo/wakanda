import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';

const friends = [
   'OK',
   'IK', 
   'OK', 
   'PK',
   'BY',
   'JW',
   'JBM',

]

const ProfileOverlay = () => {
   
   const friendsList = friends.map((el, i) => {
      return <View key={i} style={{marginRight: 15}} >
         <Avatar title={el} rounded size="large" overlayContainerStyle={{backgroundColor: 'grey'}} />
      </View>
   })
   
   return (
      <View style={styles.containerWrapper}>

         <Avatar title="IK" rounded size={108} containerStyle={{marginTop: -70, marginLeft: 'auto', marginRight: 'auto'}} overlayContainerStyle={{ backgroundColor: 'grey'}} />
         <Text style={styles.nameHeader}>Idode Kerobo</Text>
         
         <View style={styles.statContainer}>

            <View style={styles.statBox}>
               <Text style={ styles.statLabels }>Joined</Text>
               <Text style={{ ...styles.statText }}>Feb '21</Text>
            </View>
            {/* <Divider style={{ marginRight: 30, marginLeft: 30, backgroundColor: 'black', height: '90%', width: 1, marginTop: 'auto', marginBottom: 'auto' }} /> */}
            {/* <View style={styles.statBox}>
               <Text style={ styles.statLabels }>Friends</Text>
               <Text style={styles.statText}>{7}</Text>
            </View> */}
         </View>

         {/* <View style={{flex: 1, marginTop: 5, marginLeft: 15, marginRight: 15,  }}>
            <ScrollView style={{  marginTop: 10, marginBottom: 10, }} horizontal={true} showsHorizontalScrollIndicator={false}>
               {friendsList}
            </ScrollView>
         </View> */}
      </View>
   )
}

export default ProfileOverlay;

const styles = StyleSheet.create({
   containerWrapper: {
      // backgroundColor: '#DEF1E7',
      // opacity: .7,
      backgroundColor: 'rgba(222, 241, 231, 0.7)',
      borderRadius: 10,
      width: '90%',
      // height: 280,
      height: 220, // no friend horiz scroll view
      // flex: 1,
      marginTop: 40,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 10,
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