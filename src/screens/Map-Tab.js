// react/npm
import React from 'react'; // importing useContext for global state
import { StyleSheet, View, TouchableHighlight, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons'; 

// custom components
import { Map, BottomSheetComponent } from '../containers/Container-Exports';
import { Search } from '../components/Component-Exports'

// helpers/context/api's
import { GlobalContext } from '../context/GlobalState'; // importing global store
import { GET_LOCATION, REMOVE_SEARCH_RESULTS } from '../context/ActionCreators'; // importing action creator
import { categoryGetter } from '../../api/functions';

// TODO - move style into separate js file and import in

export default class MapTab extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         region: {},
         selectedBiz: {},
         selectedBizModalVisible: false,
         firstTimeLoading: false,
      }
      this.parentMapRef = React.createRef();
      this.parentBottomSheetRef = React.createRef();
   }

   static contextType = GlobalContext;

   onRegionChangeComplete = (region) => {
      this.setState({region});
   }

   onFilterPress = () => {
      this.props.navigation.openDrawer();
   }

   findLocationButton = async () => {
      const { state, dispatch } = this.context;
      const region = { 
         latitude: state.location.coords.latitude,
         longitude: state.location.coords.longitude,
         latitudeDelta: 0.0522,
         longitudeDelta: 0.0521,
      }
      this.parentMapRef.current.animateToRegion(region);
      
      // grabbing new position in case old position is stale
      const updatedLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, });
      dispatch({type: GET_LOCATION, location: updatedLocation})
   }

   showNearbyBizButton = () => {
      const { dispatch } = this.context; // clearing search results so selected biz can render
      dispatch({ type: REMOVE_SEARCH_RESULTS });
      this.setState({bizSelected: false}, () => {
         this.parentBottomSheetRef.current.snapToOpen();
      });
   }

   onMapPress = (e) => {
      if (e.nativeEvent.action != "marker-press") return;
      
      const pressedLat = e.nativeEvent.coordinate.latitude;
      const pressedLng = e.nativeEvent.coordinate.longitude;
      
      const { state, dispatch } = this.context; // clearing search results so selected biz can render
      dispatch({ type: REMOVE_SEARCH_RESULTS });
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
   }

   returnSelectedCategoryBiz = () => {
      const { state } = this.context;

      const currentBizArr = state.bizArr;
      const selectedCategories = state.selectedCategories;
      const searchActive = state.searchActive;
      const searchResults = state.searchResults;

      const filteredBizArr = [ ];
      if (searchActive) {
         for (let i=0; i < searchResults.length; i++) {
            const bizElement = searchResults[i].item;
            filteredBizArr.push(bizElement);
         }
      } else {
         currentBizArr.map(biz => {
            if ( selectedCategories.includes(categoryGetter(biz.category)) ) {
               filteredBizArr.push(biz);
            }
         })
      }
      return filteredBizArr;
   }

   firstTimeLoadAnimation = async (loaded) => {
      if (loaded) return;
      const { state } = this.context;
      const location = state.location;
      const region = { 
         latitude: location.coords.latitude,
         longitude: location.coords.longitude,
         latitudeDelta: 0.0522,
         longitudeDelta: 0.0521,
      }
      if (!loaded) {
         this.parentMapRef.current.animateToRegion(region)
         this.setState({firstTimeLoading: true});
      };
   }

   componentDidMount() {
      // zooming in when app is first loaded, delay to have cool animation
      // setTimeout( () => {
         this.firstTimeLoadAnimation(this.state.firstTimeLoading)
      // }, 800)
   }

   render() {
      return (
         <View style={styles.container}>
            {/* map has to be the first component rendered */}
            <Map
               ref={this.parentMapRef}
               onRegionChangeComplete={this.onRegionChangeComplete}
               onCalloutPress={this.onCalloutPress}
               onPress={this.onMapPress}
            />
            <Search snapOpenFunction={() => this.parentBottomSheetRef.current.snapToOpen() }/>
            <TouchableHighlight
               style={styles.filterMenuWrapper}
               onPressIn={this.onFilterPress}
               accessibilityLabel={"choose a category"}>
               <View style={styles.iconWrapper}>
                  <FontAwesome style={styles.iconStyle} name="filter" size={24} color="black" />
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
               parentMapRef={this.parentMapRef}
               bizSelected={this.state.bizSelected}
               selectedBiz={this.state.selectedBiz}
               ref={this.parentBottomSheetRef}
               // bizArr={this.context.state.bizArr}
               bizArr={this.returnSelectedCategoryBiz()} />
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
   filterMenuWrapper: {
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
      // top: 45,
      top: 110,
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