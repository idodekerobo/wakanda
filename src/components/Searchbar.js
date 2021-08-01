import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { searchObjectArray } from '../../api/search-api'
// import { quickSortBizArr } from '../../api/functions'
import { GlobalContext } from '../context/GlobalState';
import { SHOW_SEARCH_RESULTS, REMOVE_SEARCH_RESULTS, FETCH_BIZ_DATA } from '../context/ActionCreators';

// const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Search extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         search: ''
      };
   }
   static contextType = GlobalContext;
   
   // TODO - make this only show businesses nearby
   searchBiz = async (keywordString) => {
      const { state, dispatch } = this.context;
      const businesses = state.bizArr;
      const location = state.location;
      const searchResults = await searchObjectArray(businesses, keywordString, location);
      dispatch({ type: SHOW_SEARCH_RESULTS, searchResults });
      this.props.snapOpenFunction();
   }

   updateSearchText = (search) => {
      this.setState({search});
   };

   onEnterPress = (text) => {
      this.searchBiz(text);
   }
   

   render() {
      const {search} = this.state;

      return (
         <View style={styles.searchBarWrapper}>
            <SearchBar
               // platform={'default'}
               platform={'ios'}
               containerStyle={styles.searchContainerStyle}
               inputContainerStyle={styles.inputContainerStyle}
               lightTheme={true}
               placeholder="Looking for something in particular?"
               onChangeText={this.updateSearchText}
               value={search}
               showCancel={true}
               cancelButtonProps={{
                  color:'#0a431d',
               }}
               onSubmitEditing={(e) => this.onEnterPress(e.nativeEvent.text)}
            />
         </View>
         
      );
   }
}

const styles = StyleSheet.create({
   searchBarWrapper: {
      // flex: 1,
      //position
      position: 'absolute',
      top: (height*.05),
      width: '100%',
      
      // shadow
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
   },
   searchContainerStyle: {
      backgroundColor: 'transparent',
      //removing grey border
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderColor: 'transparent',
   },
   inputContainerStyle: {
      backgroundColor: 'white',
   },
   cancelButtonColor: {
      color: '#0a431d'
   },
})