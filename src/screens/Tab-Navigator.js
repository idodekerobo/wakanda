import React from 'react';
import { View, Text } from 'react-native';
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
                     return (
                              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                 <FontAwesome name="map" size={24} color={color} />
                                 <Text style={{fontSize: 15, color: '#0a431d'}}>Map</Text>
                              </View>
                           )
                  } else if (route.name === "Submit-Biz") {
                     return (
                                 <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <AntDesign name="upload" size={24} color={color} />
                                    <Text style={{fontSize: 15, color: '#0a431d'}}>Share</Text>
                                 </View>
                           )
                  } else if (route.name === "ProfileScreen" || route.name === "SignedOutProfile") {
                     return (
                              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                 <MaterialIcons name="person-pin-circle" size={28} color={color} />
                                 <Text style={{fontSize: 15, color: '#0a431d'}}>Profile</Text>
                              </View>
                           )
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