import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements'
import { GlobalContext } from '../context/GlobalState';

const PlayScreen = () => {
   const { state, dispatch } = useContext(GlobalContext);
   const [ source, setSource ] = useState({uri: state.mapSnapshot}) // set default mapSnapshot to placeholder image
   return (
      <SafeAreaView style={styles.container}>
         <Text style={{fontSize: 42, fontWeight: '400'}}>Play Screen</Text>
         <Image style={{marginBottom: 10, width:300, height:300}} source={source} PlaceholderContent={<ActivityIndicator />}/>
      </SafeAreaView>
   )
}
export default PlayScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 100,
      marginBottom: 100,
   }
})