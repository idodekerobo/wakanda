import React from 'react';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
import CREDENTIALS from './credentials'
// import Permissions.getAsync(...)
import { HomeScreen } from './components/screens/screens';

export default class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = {

      }
   }

   render() {
      return (
         <HomeScreen/>
      );
   }
}