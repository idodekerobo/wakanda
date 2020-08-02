import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapTab from './Map-Tab';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
   return (
      <NavigationContainer>
         <Tab.Navigator>
            <Tab.Screen name="Map" component={MapTab} />
            {/* <Tab.Screen name="" component={} /> */}
            {/* <Tab.Screen name="" component={} /> */}
         </Tab.Navigator>
      </NavigationContainer>
   );
}