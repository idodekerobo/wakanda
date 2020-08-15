import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Categories = () => {
   return (
      <View style={styles.container}>
         <View>
            <Text>This will be the component where u can filter the list</Text>
         </View>
         <View>
            {/* <List></List> */}
         </View>
      </View>
   )
}
export default Categories;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   }
})