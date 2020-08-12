import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { FormikComponent, FormOverlay } from '../components/Component-Exports'

const BizForm = () => {
   const [isVisible, setVisible] = useState(false); // set to false
   const toggleOverlay = () => {
      setVisible(!isVisible);
   }
   return (
      <View style={styles.container}>
         <FormikComponent toggleOverlay={toggleOverlay}/>
         <FormOverlay visible={isVisible} toggleOverlay={toggleOverlay}/>
      </View>
   )
}
export default BizForm;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
   },
})