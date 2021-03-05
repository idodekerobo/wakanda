import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OverlayChildren = ({ toggleOverlay }) => {
   return (
   <View style={styles.viewContainer}>
      <Text style={styles.text}>
         Thank you for supporting minorities in your community!
            </Text>

      <View style={styles.iconContainer}>
         <MaterialCommunityIcons name="check" size={128} color="green" />
      </View>

      <Button title="Close" onPress={toggleOverlay} containerStyle={styles.buttonContainerStyle} buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitleStyle} />
   </View>
   )
}

const FormOverlay = ({visible, toggleOverlay}) => {
   return (
      <Overlay children={<OverlayChildren toggleOverlay={toggleOverlay} />} isVisible={visible} overlayStyle={styles.overlayStyle} />
   )
}
export default FormOverlay;

const styles = StyleSheet.create({
   overlayStyle: {
      height: '50%',
      width: '85%',
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   },
   viewContainer: {
      flex: 1,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',     
   },
   iconContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      marginTop: -20,
      alignItems: 'center',
   },
   buttonContainerStyle: {
      alignItems: 'center',
      width: '100%',
      marginBottom: 30,
   },
   buttonStyle: {
      width: '80%',
      textAlign: 'center',
      backgroundColor: "#0a431d",
   },
   buttonTitleStyle: {
      flex: 1,
      fontSize: 24,
      fontWeight: '500',
   },
   iconStyle: {
      marginBottom: 0,
   },
   text: {
      marginTop: 50,
      fontSize: 28,
      width: '80%',
      textAlign: 'center',
      fontWeight: '300',
      color: "#0a431d",
   },
})