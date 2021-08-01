import React from 'react';
import Wakanda from './Wakanda';

// global state
import GlobalProvider from './context/GlobalState';

// TODO - make the .getLocation() and .getData() methods call while app is loading

export default class App extends React.Component {

   constructor(props) {
      super(props);
   }

   componentDidMount() {
      // console.log("Wrapper component mounted");
   }

   render() {
      return (
         <GlobalProvider>
            <Wakanda/>
         </GlobalProvider>
      );
   }
}