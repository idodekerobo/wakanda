import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FormOverlay = ({visible, toggleOverlay}) => {
   return (
      <Overlay isVisible={visible} overlayStyle={styles.overlayStyle}>

         <Text style={styles.text}>
            Thank you for helping grow Afe!
         </Text>

         <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="check" size={128} color="green" />
         </View>
         
         <Button title="Close" onPress={toggleOverlay} containerStyle={styles.buttonContainerStyle} buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitleStyle}/>
      </Overlay>
   )
}
export default FormOverlay;

const styles = StyleSheet.create({
   overlayStyle: {
      height: '60%',
      width: '85%',
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   },
   iconContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 15,
   },
   buttonContainerStyle: {
      alignItems: 'center',
      width: '100%',
      marginBottom: 30,
   },
   buttonStyle: {
      width: '80%',
      textAlign: 'center',
   },
   buttonTitleStyle: {
      flex: 1,
   },
   iconStyle: {
      marginBottom: 0,
   },
   text: {
      marginTop: 50,
      fontSize: 18,
   },
})