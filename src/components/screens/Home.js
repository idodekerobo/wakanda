import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';
import { Map, Search } from '../containers/containers';
import { Card, Overlay, Button } from 'react-native-elements';
import CREDENTIALS from '../../credentials'

import * as firebase from 'firebase/app';
import "firebase/firestore";

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
   },
   overlayStyle: {
      width: '85%',
   },
   cardStyle: {
      // backgroundColor: 'transparent',
      // borderTopWidth: 0,
      // borderBottomWidth: 0,
   },
   buttonStyle: {
      marginBottom: 13,
   },
});

// TODO - lift bizArr prop/state up to this component and pass into Map and Overlay components

export default class HomeScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         region: {
            latitude: 5,
            longitude: 20,
            latitudeDelta: 180,
            longitudeDelta: 180,
         },
         overlayVisible: false,
         bizArr: this.props.bizArr,
         selectedBiz: null,
      }
   }

   toggleOverlay = () => {
      this.setState(prevState => {
         return {
            overlayVisible: !prevState.overlayVisible
         }
      });
   }

   backdropPress = () => {
      console.log('backdrop press');
      this.toggleOverlay();
   }

   findLocationButton = () => {
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

   onMapPress = (e) => {
      if (e.nativeEvent.action != "marker-press") return;
      
      const pressedLat = e.nativeEvent.coordinate.latitude;
      const pressedLng = e.nativeEvent.coordinate.longitude;

      const selectedBiz = this.props.bizArr.slice().find(biz => { 
         const { latitude, longitude } = biz.coordinates;
         // have to destructure to access coordinates from geopoint object in firebase
         // DESTRUCTURING VALUE NAMES HAVE TO BE THE SAME AS WHATS IN THE OBJECT
         // WON'T WORK IF CHANGED CONST'S TO bizLatitude or bizLongitude 
            
         if (latitude === pressedLat && longitude === pressedLng) return biz;
      });
      console.log('clicked biz', selectedBiz);
      this.setState({selectedBiz});
   }  

   callBusiness = (tel) => {
      Linking.openURL('tel:4432481465')
   }

   openInMaps = (address) => {      
   }

   visitWebsite = (websiteUrl) => {
      Linking.openURL('http://idode.me');
   }

   render() {
      return (
         <View style={styles.container}>
            <Map bizArr={this.props.bizArr} region={this.state.region} viewMore={this.toggleOverlay} onPress={this.onMapPress} />
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

            <Overlay overlayStyle={styles.overlayStyle} isVisible={this.state.overlayVisible} onBackdropPress={this.backdropPress} >
               <Card containerStyle={styles.cardStyle} title="Ocean Blue" image={require('./../../../assets/300x200.gif')}>
                  <Text style={{marginBottom: 10}}>Monday - Friday 10a-10p</Text>
                  <Button style={styles.buttonStyle} onPress={this.callBusiness} title="Call Business"/>
                  <Button style={styles.buttonStyle} title="Open in Maps"/>
                  <Button style={styles.buttonStyle} onPress={this.visitWebsite} title="Visit Website"/>
                  <Button onPress={this.backdropPress} title="Close"/>
               </Card>
            </Overlay>

            {/* <Text>This is the longitude and latitude: {this.props.latitude}, {this.props.longitude}</Text> */}
         </View>
      );
   }
}