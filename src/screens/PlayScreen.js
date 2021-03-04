import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { GlobalContext } from '../context/GlobalState';

const PlayScreen = () => {
   const { state, dispatch } = useContext(GlobalContext);
   return (
      <View style={styles.container}>
         <Text>play screen</Text>
      </View>
   )
}
export default PlayScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   }
})