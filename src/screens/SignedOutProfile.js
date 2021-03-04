import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const SignedOutProfile = () => {
   return (
      <SafeAreaView style={styles.container}>
         <Text>signed out profile</Text>
      </SafeAreaView>
   );
}
export default SignedOutProfile;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   }
})