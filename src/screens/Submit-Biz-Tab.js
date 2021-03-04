import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { BizForm } from '../containers/Container-Exports';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SubmitFormScreen = () => {
   return (
      <View style={styles.container}>

         <View style={styles.textContainer}>
            <Text h4 h4Style={styles.header}>Know a <Text h4 h4Style={styles.blackOwned}>black-owned</Text> business?</Text>
            {/* <Text style={styles.subHeader}>Know a black-owned business that we don't?</Text> */}
            <Text style={styles.subHeader}>Get us acquainted!</Text>
         </View>
         
         <KeyboardAwareScrollView style={styles.formContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}><BizForm/></ScrollView>
         </KeyboardAwareScrollView>
      
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