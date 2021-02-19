import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import { GlobalContext } from '../context/GlobalState';

const ButtonGroupComponent = () => {
   const { dispatch } = useContext(GlobalContext);
   const buttons = ['All', 'Food', 'Cosmetic', 'Arts', 'Other']
   const [selectedIndex, setIndex] = useState(0);
   
   const onPress = (selectedIndex) => {
      setIndex(selectedIndex);
      // global state lags after the local state
      dispatch({type: 'SELECTED_CATEGORY', category: selectedIndex});
   }
   // categories
      // restaurant
      // technology
      // cosmetics
      // clothing
      // arts
   
   return (
      // <View style={styles.buttonGroupWrapper}>
         <ButtonGroup
            selectedIndex={selectedIndex}
            onPress={onPress}
            vertical
            buttons={buttons}
            containerStyle={styles.buttonGroupContainer}
            buttonContainerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
         />
      // </View>
   );
}
export default ButtonGroupComponent;

const styles = StyleSheet.create({
   buttonGroupWrapper: {
      //position
      display: 'flex',
      position: 'absolute',
      top: 27,
      width: '95%',
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
   textStyle: {
      fontSize: 13,
   }
})