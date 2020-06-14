import React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

const styles = StyleSheet.create({
   // searchStyle: {
   //    top: 0,
   //    left: 0,
   //    width: 100,
   //    height: 100
   // }
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
         <SearchBar
            style={styles.searchStyle}
            placeholder="Search for a location"
            onChangeText={this.updateSearch}
            value={search}
         />
      );
   }
}