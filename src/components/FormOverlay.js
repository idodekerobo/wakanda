import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

const FormOverlay = ({visible, toggleOverlay}) => {
   return (
      <Overlay isVisible={visible} overlayStyle={styles.overlayStyle}>
         <Text>
            Thank you for submitting the form!
         </Text>
         <Button title="Close" onPress={toggleOverlay} containerStyle={styles.buttonContainerStyle} buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitleStyle}/>
      </Overlay>
   )
}
export default FormOverlay;

const styles = StyleSheet.create({
   overlayStyle: {
      height: '50%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
   },
   buttonContainerStyle: {
      alignItems: 'center',
      width: '80%',
   },
   buttonStyle: {
      width: '80%',
      textAlign: 'center',
   },
   buttonTitleStyle: {
      flex: 1,
   }
})