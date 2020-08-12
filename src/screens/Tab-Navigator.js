import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapTab, SubmitFormScreen } from './Screen-Exports';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

   return (
      <NavigationContainer>
         <Tab.Navigator screenOptions={ ({route}) => ({
               tabBarIcon: ({focused, color, size}) => {
                  if (route.name === "Map") {
                     return (<FontAwesome name="map" size={24} color={color} />)
                  } else if (route.name === "Submit-Biz") {
                     return (<FontAwesome5 name="business-time" size={24} color={color}/>)
                  }
               },
            })}
            tabBarOptions={{
               activeTintColor: 'blue',
               inactiveTintColor: 'grey',
               showLabel: false,
            }}
            >
            <Tab.Screen name="Map" component={MapTab}/>
            <Tab.Screen name="Submit-Biz" component={SubmitFormScreen} />
            {/* <Tab.Screen name="" component={} /> */}
         </Tab.Navigator>
      </NavigationContainer>
   );
}