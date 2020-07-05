import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';
import { Map, Search } from '../containers/containers';
import { Card, Overlay, Button } from 'react-native-elements';
import BottomSheetComponent from '../containers/BottomSheet';
import CREDENTIALS from '../../credentials'

// TODO - have bizArr render the markers in map component
// TODO - have selectedBiz in state feed everything in overlay
// TODO - add bottom sheet package to manage businesses we're viewing
// TODO - fix websites and address functions on overlay
// TODO - move style into separate js file and import in


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
         selectedBiz: {},
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

   callBusiness = () => {
      const num = this.state.selectedBiz.tel;
      Linking.openURL(`tel:${num}`).catch(e => console.log(e));
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
            
            <TouchableHighlight
               style={styles.shadowWrapper}
               onPressIn={this.findLocationButton}
               accessibilityLabel={"Find location button"}>
                  <View style={styles.iconWrapper}>
                     <FontAwesome
                        style={styles.locationIconStyle}
                        name="location-arrow"
                        size={24}
                        color="black"
                     />
                  </View>
            </TouchableHighlight>

            <BottomSheetComponent/>

            <Overlay overlayStyle={styles.overlayStyle} isVisible={this.state.overlayVisible} onBackdropPress={this.backdropPress} >
               <Card containerStyle={styles.cardStyle} title={this.state.selectedBiz.name} image={require('./../../../assets/300x200.gif')}>
                  <Text style={{marginBottom: 10}}>Monday - Friday 10a-10p</Text>
                  <Button style={styles.buttonStyle} onPress={this.callBusiness} title="Call Business"/>
                  <Button style={styles.buttonStyle} title="Open in Maps"/>
                  <Button style={styles.buttonStyle} onPress={this.visitWebsite} title="Visit Website"/>
                  <Button onPress={this.backdropPress} title="Close"/>
               </Card>
            </Overlay>

         </View>
      );
   }
}

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
      borderRadius: 100,
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
   },
   buttonStyle: {
      marginBottom: 13,
   },
});