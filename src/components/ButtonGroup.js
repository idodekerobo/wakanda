import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import { GlobalContext } from '../context/GlobalState';

const ButtonGroupComponent = () => {
   const { dispatch } = useContext(GlobalContext);
   const buttons = ['All', 'Food', 'Arts', 'Service', 'Other']
   const [selectedIndex, setIndex] = useState(0);
   
   const onPress = (selectedIndex) => {
      setIndex(selectedIndex);
      // global state lags after the local state
      dispatch({type: 'SELECTED_CATEGORY', category: selectedIndex});
   }
   
   return (
      <View style={styles.buttonGroupWrapper}>
         <ButtonGroup
            selectedIndex={selectedIndex}
            onPress={onPress}
            buttons={buttons}
            containerStyle={styles.buttonGroupContainer}
            buttonContainerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
         />
      </View>
   );
}
export default ButtonGroupComponent;

const styles = StyleSheet.create({
   buttonGroupWrapper: {
      // flex: 1,
      //position
      display: 'flex',
      position: 'absolute',
      top: 27,
      width: '100%',
      height: '8%',
      backgroundColor: 'transparent',
      // shadow
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
   },
   buttonGroupContainer: {
      flex: 1,
      borderWidth: 0,
   },
   buttonContainer: {
   },
   buttonStyle: {
   },
})