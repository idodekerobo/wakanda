import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Map, Search } from '../containers/containers';
import CREDENTIALS from '../../credentials';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f5fcff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export default class HomeScreen extends React.Component {

   constructor(props) {
      super(props);
   }
   render() {
      return (
         <View style={styles.container}>
            <Map/>
            <Search/>
            <Text>{this.props.location}</Text>
         </View>
      );
   }
}