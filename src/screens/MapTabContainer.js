import React from 'react'; // importing useContext for global state
import { MapTab } from './Screen-Exports';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../containers/DrawerContent';

const Drawer = createDrawerNavigator();

const MapTabContainer = () => {
   return (
      <Drawer.Navigator initialRouteName="Map" drawerContent={(props) => <DrawerContent {...props} />}>
         <Drawer.Screen name="Map" component={MapTab}/>
      </Drawer.Navigator>
   )
}

export default MapTabContainer;