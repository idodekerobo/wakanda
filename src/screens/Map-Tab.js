import React from 'react'; // importing useContext for global state
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Map, BottomSheetComponent } from '../containers/Container-Exports';
import { GlobalContext } from '../context/GlobalState'; // importing global store

// TODO - move style into separate js file and import in

const categoryGetter = (bizCategory) => {
   if (bizCategory === 'restaurant') return 1;
   if (bizCategory === 'cosmetics') return 2;
   if (bizCategory === 'arts') return 3;
   if (bizCategory === 'clothing') return 3;
   if (bizCategory === 'technology') return 4;
   if (bizCategory === 'other') return 4;
}

export default class MapTab extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         region: {},
         selectedBiz: {},
         selectedBizModalVisible: false,
      }
      this.parentMapRef = React.createRef();
      this.parentBottomSheetRef = React.createRef();
   }

   static contextType = GlobalContext;

   onRegionChangeComplete = (region) => {
      this.setState({region});
   }

   onHamburgerPress = () => {
      this.props.navigation.openDrawer();
   }

   findLocationButton = () => {
      const { state } = this.context;
      const region = { 
         latitude: state.location.coords.latitude,
         longitude: state.location.coords.longitude,
         latitudeDelta: 0.0122,
         longitudeDelta: 0.0221,
      }
      this.parentMapRef.current.animateToRegion(region);
   }

   showNearbyBizButton = () => {
      this.setState({bizSelected: false}, () => {
         this.parentBottomSheetRef.current.snapToOpen();
      });
   }

   onMapPress = (e) => {
      if (e.nativeEvent.action != "marker-press") return;
      
      const pressedLat = e.nativeEvent.coordinate.latitude;
      const pressedLng = e.nativeEvent.coordinate.longitude;
      
      const { state } = this.context;
      const selectedBiz = state.bizArr.slice().find(biz => { 
         const { latitude, longitude } = biz.coordinates;
         // have to destructure to access coordinates from geopoint object in firebase
         // DESTRUCTURING VALUE NAMES HAVE TO BE THE SAME AS WHATS IN THE OBJECT
         // WON'T WORK IF CHANGED CONST'S TO bizLatitude or bizLongitude 
         if (latitude === pressedLat && longitude === pressedLng) return biz;
      });
      this.setState({
         bizSelected: true,
         selectedBiz
      }, () => { });
   }

   onCalloutPress = () => {
      this.parentBottomSheetRef.current.snapToOpen();
      // need to pass in the region of the business into this takeSnapshot function
      // this.takeSnapshot();
   }

   returnSelectedCategoryBiz = () => {
      const { state } = this.context;
      let arr = [ ];
      arr = state.bizArr.map(biz => {
         if ( state.selectedCategories.includes(categoryGetter(biz.category)) ) {
            return biz;
         } else {
            return;
         }
      })
      console.log(arr);
      return arr;
   }

   componentDidMount() {

   }

   render() {
      return (
         <View style={styles.container}>
            <Map
               ref={this.parentMapRef}
               bizArr={this.props.bizArr}
               onRegionChangeComplete={this.onRegionChangeComplete}
               onCalloutPress={this.onCalloutPress}
               onPress={this.onMapPress}
            />

            <TouchableHighlight
               style={styles.hambugerMenuWrapper}
               onPressIn={this.onHamburgerPress}
               accessibilityLabel={"choose a category"}>
               <View style={styles.iconWrapper}>
                  <FontAwesome style={styles.iconStyle} name="bars" size={24} color="black" />
               </View>
            </TouchableHighlight>
            
            <TouchableHighlight
               style={styles.locationButtWrapper}
               onPressIn={this.findLocationButton}
               accessibilityLabel={"Find location button"}>
                  <View style={styles.iconWrapper}>
                     <FontAwesome
                        style={styles.iconStyle}
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
                        style={styles.iconStyle}
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
               bizArr={this.context.state.bizArr}/>
               {/* bizArr={this.returnSelectedCategoryBiz} /> */}
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
   hambugerMenuWrapper: {
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
      
      //position
      position: 'absolute',
      top: 45,
      left: 15,
   },
   iconStyle: {
      // color: '#0a431d',
      color: '#fff',
      fontSize: 28,
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
      bottom: 45,
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
      bottom: 45,
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
      // backgroundColor: 'white',
      backgroundColor: '#0a431d',
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