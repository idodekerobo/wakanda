import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SubmitFormScreen, SignedInProfile, SignedOutProfile } from './Screen-Exports';
import MapTabContainer from './MapTabContainer';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import PlayScreen from './PlayScreen';

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
                  } else if (route.name === "SignedInProfile" || route.name === "SignedOutProfile") {
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
            {/* <Tab.Screen name="SignedOutProfile" component={SignedOutProfile} /> */}
            <Tab.Screen name="Play" component={PlayScreen} />
            <Tab.Screen name="SignedInProfile" component={SignedInProfile} />
            {/* <Tab.Screen name="SignedOutProfile" component={SignedOutProfile} /> */}
            <Tab.Screen name="Submit-Biz" component={SubmitFormScreen} />
         </Tab.Navigator>
      </NavigationContainer>
   );
}