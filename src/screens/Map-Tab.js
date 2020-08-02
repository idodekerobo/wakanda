import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
// import * as Linking from 'expo-linking';
import { Map } from '../containers/Container-Exports';
import { Search } from '../components/Component-Exports';
import BottomSheetComponent from '../containers/BottomSheet';

// TODO - add bottom sheet package to manage businesses we're viewing
// TODO - fix websites and address functions on view business bottom sheet
// TODO - move style into separate js file and import in


export default class MapTab extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         region: {
            latitude: 5,
            longitude: 20,
            latitudeDelta: 180,
            longitudeDelta: 180,
         },
         bizArr: this.props.bizArr,
         bizSelected: false,
         selectedBiz: {},
      }
      this.parentMapRef = React.createRef();
      this.parentBottomSheetRef = React.createRef();
   }

   onRegionChangeComplete = (region) => {
      this.setState({region});
   }

   findLocationButton = () => {
      const region = { 
         latitude: this.props.latitude,
         longitude: this.props.longitude,
         latitudeDelta: 0.0122,
         longitudeDelta: 0.0221,
      }
      this.parentMapRef.current.animateToMethod(region);
   }

   showNearbyBizButton = () => {
      this.setState({bizSelected: false}, () => {
         // console.log("state", this.state);
         // console.log(this.props);
         this.parentBottomSheetRef.current.snapToOpen()
      });
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
      this.setState({
            bizSelected:true,
            selectedBiz}
      , () => { });
   }

   onCalloutPress = () => {
      this.parentBottomSheetRef.current.snapToOpen();
   }

   render() {
      return (
         <View style={styles.container}>
            <Map
               ref={this.parentMapRef}
               // currentRegion={this.currentRegion}
               bizArr={this.props.bizArr}
               onRegionChangeComplete={this.onRegionChangeComplete}
               onCalloutPress={this.onCalloutPress}
               onPress={this.onMapPress}
            />

            <Search/>
            
            <TouchableHighlight
               style={styles.locationButtWrapper}
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

            <TouchableHighlight
               style={styles.nearbyBizButtonWrapper}
               onPressIn={this.showNearbyBizButton}
               accessibilityLabel={"See nearby businesses"}>
                  <View style={styles.iconWrapper}>
                     <FontAwesome
                        style={styles.locationIconStyle}
                        name="briefcase"
                        size={24}
                        color="black"
                     />
                  </View>
            </TouchableHighlight>

            <BottomSheetComponent 
               bizSelected={this.state.bizSelected}
               selectedBiz={this.state.selectedBiz}
               ref={this.parentBottomSheetRef}
               bizArr={this.props.bizArr}/>
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
   locationButtWrapper: {
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
   nearbyBizButtonWrapper: {
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
      left: 15,
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