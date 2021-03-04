import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const BizActionButton = ({logo, action}) => {
   return (
      <TouchableOpacity onPress={action}>
         <View style={styles.iconWrapper}>
            {logo}
         </View>
      </TouchableOpacity>
   )
}
export default BizActionButton;

const styles = StyleSheet.create({
   iconWrapper: {
      // alignment
      justifyContent: 'center',
      alignItems: 'center',
      // circular background
      height: 45,
      width: 45,
      borderRadius: 45/2,
      // backgroundColor: 'white',
      backgroundColor: '#0a431d',
      overflow: 'hidden',
      marginRight: 5,
      marginBottom: 5,
   },
})