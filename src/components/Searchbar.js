import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

const styles = StyleSheet.create({
   searchBarWrapper: {
      //position
      position: 'absolute',
      top: 25,
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
   }
})
export default class Search extends React.Component {
   state = {
      search: ''
   };

   updateSearch = (search) => {
      this.setState({search});
   };

   render() {
      const {search} = this.state;

      return (
         <View style={styles.searchBarWrapper}>
            <SearchBar
               platform={'default'}
               containerStyle={styles.searchContainerStyle}
               inputContainerStyle={styles.inputContainerStyle}
               lightTheme={true}
               placeholder="Search for a location"
               onChangeText={this.updateSearch}
               value={search}
            />
         </View>
         
      );
   }
}