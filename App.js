import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import CREDENTIALS from './credentials'

/*
const instructions = Platform.select({
ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});
*/

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   mapStyle: {
      // width: Dimensions.get('window'),
      // height: Dimensions.get('window').height
   },
});

export default class App extends React.Component {
   render() {
      return (
         <View style={styles.container}>
            <Text>this is the map</Text>
            <MapView style={styles.mapStyle}/>
         </View>
      );
   }
}