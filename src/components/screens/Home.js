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
   locationIconStyle: {
      color: 'blue',
      fontSize: 20,
   },
   shadowWrapper: {
      // shadow
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
      // position
      position: 'absolute',
      bottom: 70,
      right: 15,
   },
   iconWrapper: {
      // alignment
      justifyContent: 'center',
      alignItems: 'center',
      // circular background
      height: 60,
      width: 60,
      borderRadius: 60/2,
      backgroundColor: 'white',
      overflow: 'hidden',

      
   }
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
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0221,
         }
      })
      console.log('end of find location icon button func');
   }

   render() {
      return (
         <View style={styles.container}>
            <Map region={this.state.region}/>
            <Search/>
            <View style={styles.shadowWrapper}>
               <View style={styles.iconWrapper}>
                  <FontAwesome
                     style={styles.locationIconStyle}
                     name="location-arrow"
                     size={24}
                     color="black"
                     onPress={this.findLocationButton}
                     />
               </View>
            </View>
            <Text>This is the longitude and latitude: {this.props.latitude}, {this.props.longitude}</Text>
         </View>
      );
   }
}