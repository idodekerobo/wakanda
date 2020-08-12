import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { BizForm } from '../containers/Container-Exports';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SubmitFormScreen = () => {
   return (
      <View style={styles.container}>

         <View style={styles.textContainer}>
            <Text h4 h4Style={styles.header}>Help get businesses on Afe!</Text>
            <Text style={styles.subHeader}>Know a black-owned business that we don't?</Text>
            <Text style={styles.subHeader}>Get us acquainted!</Text>
         </View>
         
         <KeyboardAwareScrollView>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
               <BizForm/>
            </ScrollView>
         </KeyboardAwareScrollView>
      
      </View>
   );
}
export default SubmitFormScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 50,
   },
   textContainer: {
      marginLeft: 25,
      width: '88%',
      marginBottom: 20,
   },
   header: {
      marginBottom: 5,
   },
   subHeader: {
      fontSize: 16
   },
   scrollViewContainer: {
      flex: 1,
      alignItems: 'center',
   },
});