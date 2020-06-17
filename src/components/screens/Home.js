import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Map, Search } from '../containers/containers';
import CREDENTIALS from '../../credentials'

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f5fcff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   // TODO - style the location button
   locationIconStyle: {
      borderWidth: 1,
      borderStyle: 'dotted',
   },
});

export default class HomeScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         region: {
            latitude: 5,
            longitude: 20,
            latitudeDelta: 180,
            longitudeDelta: 180,
         }
      }
      this.findLocationButton = this.findLocationButton.bind(this);
   }

   findLocationButton() {
      console.log('pressed find location icon button');
      // change state to maps
      this.setState({
         region: {
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
         }
      })
      console.log('end of find location icon button func');
   }
   
   render() {
      return (
         <View style={styles.container}>
            <Map region={this.state.region}/>
            <FontAwesome
               style={styles.locationIconStyle}
               name="location-arrow"
               size={24}
               color="black"
               onPress={this.findLocationButton}
            />
            {/* <Search/> */}
            <Text>This is the longitude and latitude: {this.props.latitude}, {this.props.longitude}</Text>
         </View>
      );
   }
}