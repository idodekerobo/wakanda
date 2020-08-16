import React from 'react';
import { AppLoading } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import TabNavigator from './screens/Tab-Navigator';
import * as dbApi from '../api/firestore-api';

// global state
import { GlobalContext } from './context/GlobalState';

export default class Wakanda extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isReady: false,
         errorMsg: '',
      }
   }
   static contextType = GlobalContext;

   getLocation = async () => {
      console.log('get location function is running')
      const { dispatch } = this.context;
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
         this.setState({
            errorMsg: 'Permission not granted'
         });
      }
      const location =  await Location.getCurrentPositionAsync();
      dispatch({type: 'GET_LOCATION', location})
   }

   anonSignIn = async () => {
      dbApi.signInAnon();
   }
   
   getData = async () => {
      const signIn = await dbApi.signInAnon();
      signIn; // is this correct?????
      const fetchBizArr = await dbApi.getAllBusinesses();
      const { dispatch } = this.context;
      dispatch({type: 'FETCH_BIZ_DATA', arr: fetchBizArr});
   }

   componentDidMount() {
      console.log('==============================================');
      console.log('app running');
      console.log();
      this.getData();
      this.getLocation();
   }

   appLoadingFunc = () => {
   }

   render() {
      if (!this.state.isReady) {
         return (
            <AppLoading
               startAsync={this.appLoadingFunc}
               onFinish={() => this.setState({isReady: true})}
               onError={console.warn}
            />
         );
      } else {
         return (
            <TabNavigator />
         );
      }     
   }
}