import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Share } from 'react-native';
import { Text, ButtonGroup, Button } from 'react-native-elements';
import { BizForm } from '../containers/Container-Exports';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SUBMIT_BIZ_FORM_URL_LINK } from '../../api/functions';

const buttons = [ `Send To Friend`, `Submit Yourself` ];

const SubmitFormScreen = () => {
   const [ status, setStatus ] = useState(null);
   // const [ status, setStatus ] = useState(buttons[1]);
   const [ selectedButtonArr, setSelectedButtonArr ] = useState(null)

   const nullStateButtonGroupContainerStyle = {
      marginTop: 'auto',
      marginBottom: 'auto',
      height: 125,
   }

   const onButtonGroupPress = (i) => {
      setStatus(buttons[i])
      setSelectedButtonArr(i);
   }

   const onShare = async () => {
      try {
         const result = await Share.share({
            // message: 'Send to a friend so they can add their business to the platform!'
            // TODO - link to airtable or some type of form for user to fill out
            url: SUBMIT_BIZ_FORM_URL_LINK
         });
         if (result.action === Share.sharedAction) {
            if (result.activityType) {
               // shared with activity type of result.activityType
            } else {
               // shared
            } 
         } else if (result.action === Share.dismissedAction) {
            // dismissed
         }
      } catch (e) {
         console.log(error.message);
         alert(`Share did not work. Please try again later!`)
      }
   };

   return (
      <View style={styles.container}>

         <View style={styles.textContainer}>
            <Text h4 h4Style={styles.header}>Know a <Text h4 h4Style={styles.blackOwned}>black-owned</Text> business?</Text>
            {/* <Text style={styles.subHeader}>Know a black-owned business that we don't?</Text> */}
            <Text style={styles.subHeader}>Get us acquainted!</Text>
         </View>

         <ButtonGroup
            buttons={buttons}
            onPress={onButtonGroupPress}
            selectedIndex={selectedButtonArr}
            // containerStyle={styles.buttonGroupContainerStyle}
            containerStyle={[styles.buttonGroupContainerStyle, (!status) ? nullStateButtonGroupContainerStyle : null]}
            selectedButtonStyle={styles.buttonGroupSelectedButtonStyle}
            buttonStyle={styles.buttonGroupButtonStyle}
            textStyle={styles.buttonGroupTextStyle}
            innerBorderStyle={styles.buttonGroupInnerBorderStyle}
            underlayColor='#d8e8dd'
         />

         { (!status) ?
            null
            : (status == buttons[0]) ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
               <Button title="Share With Friends!"
                  onPress={onShare}
                  containerStyle={styles.buttonContainerStyle}
                  buttonStyle={styles.buttonStyle}
                  titleStyle={styles.buttonTitleStyle}
               />
            </View>
            : 
            <KeyboardAwareScrollView style={styles.formContainer}>
               <ScrollView contentContainerStyle={styles.scrollViewContainer}><BizForm/></ScrollView>
            </KeyboardAwareScrollView>  
         }
      
      </View>
   );
}
export default SubmitFormScreen;

const styles = StyleSheet.create({
   container: {
      marginTop: '1%',
      flex: 1,
      paddingTop: 50,
      backgroundColor: '#d8e8dd',
      // backgroundColor: '#0a431d',
   },
   textContainer: {
      marginLeft: 25,
      width: '88%',
      marginBottom: 20,
   },
   header: {
      marginBottom: 5,
      // color: '#fff',
   },
   blackOwned: {
      color: '#0a431d',
      textDecorationLine: 'underline',
      textDecorationColor: '#0a431d',
      // textDecorationStyle: 'double',
   },
   subHeader: {
      fontSize: 18
   },
   buttonContainerStyle: {
      // height: 125,
      width: '80%',
      // alignItems: 'center',
   },
   buttonStyle: {
      borderRadius: 20,
      backgroundColor: '#0a431d',
      width: '100%',
      height: 155,
      textAlign: 'center',
   },
   buttonTitleStyle: {
      fontSize: 30,
      color: 'white',
      // textAlign: 'center',
   },
   buttonGroupContainerStyle: {
      // marginTop: 'auto',
      // marginBottom: 'auto',
      // height: 125,

      height: 50,
      borderRadius: 15,
      borderWidth: 0,
      marginBottom: 10,
      // borderColor: '#0a431d',
   },
   buttonGroupButtonStyle: {

   },
   buttonGroupSelectedButtonStyle: {
      backgroundColor: '#0a431d',
   },
   buttonGroupTextStyle: {
      fontSize: 20,
      color: '#0a431d',
   },
   buttonGroupInnerBorderStyle: {
      // color: '#b5c6bb',
      color: '#d8e8dd',
   },
   formContainer: {
      flex: 1,
      height: '100%',
      backgroundColor: '#fff',
      borderRadius: 20,
   },
   scrollViewContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20,
      // marginBottom: 20,
   },
});