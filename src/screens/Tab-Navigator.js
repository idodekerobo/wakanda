import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapTabContainer, SubmitFormScreen, ProfileScreen } from './Screen-Exports';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

   return (
      <NavigationContainer>
         <Tab.Navigator screenOptions={ ({route}) => ({
               tabBarIcon: ({focused, color, size}) => {
                  if (route.name === "Map") {
                     return (<FontAwesome name="map" size={30} color={color} />)
                  } else if (route.name === "Submit-Biz") {
                     return <AntDesign name="upload" size={30} color={color} />
                  } else if (route.name === "ProfileScreen" || route.name === "SignedOutProfile") {
                     return <MaterialIcons name="person-pin-circle" size={38} color={color} />
                  } else {
                     return <Text>{route.name}</Text>;
                  }
               },
            })}
            tabBarOptions={{
               activeTintColor: '#0a431d',
               inactiveTintColor: 'grey',
               showLabel: false,
               // style:{backgroundColor: '#d8e8dd'}
            }}
            >
            <Tab.Screen name="Map" component={MapTabContainer}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
            <Tab.Screen name="Submit-Biz" component={SubmitFormScreen} />
         </Tab.Navigator>
      </NavigationContainer>
   );
}