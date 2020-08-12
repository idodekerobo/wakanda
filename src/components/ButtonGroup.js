import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements'

const ButtonGroupComponent = () => {
   const buttons = ['Food', 'Arts', 'Service', 'Other']
   const [selectedIndex, setIndex] = useState(null)
   return (
         <ButtonGroup
            selectedIndex={selectedIndex}
            onPress={selectedIndex => setIndex(selectedIndex)}
            buttons={buttons}
            containerStyle={styles.buttonGroupContainer}
            buttonContainerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
         />
   );
}
export default ButtonGroupComponent;

const styles = StyleSheet.create({
   buttonGroupContainer: {
      height: '10%',
      marginBottom: 15,
   },
   buttonContainer: {
      
   },
   buttonStyle: {
      backgroundColor: 'lightgrey',
      paddingLeft: 10,
      paddingRight: 10,
   },
})