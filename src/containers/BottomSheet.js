import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import BottomSheet from 'reanimated-bottom-sheet';
import { Divider } from 'react-native-elements';
import openMap from 'react-native-open-maps';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default class BottomSheetComponent extends React.Component {

   constructor(props) {
      super(props);
      this.bsRef = React.createRef();
   }

   callBusiness = (tel) => {
      if (tel === undefined || tel === '') return;
      Linking.openURL(`tel:${tel}`).catch(e => console.log(e));
   }

   openInMaps = (coordinates, name) => {
      if (coordinates === undefined || coordinates === '') return;
      openMap({ coordinates, query: name });
   }

   visitWebsite = (website) => {
      if (website === undefined || website === '') return;
      Linking.openURL(website).catch(e => console.log(e));;
   }

   // extractKey = ({ _id }) => _id;

   renderNearbyBizJSX = ({ item }) => (
      <View key={item._id}>
         <View style={styles.listItemInfo}>
            <Text style={{ fontSize: 28, paddingBottom: 10 }}>{item.name}</Text>
            <Text style={{ fontSize: 16, paddingBottom: 5 }}>{item.desc}</Text>
         </View>

         <View style={styles.listItemLinks}>
            <TouchableOpacity onPress={() => this.callBusiness(item.tel)}>
               <View style={styles.iconWrapper}>
                  <Feather name="phone-call" size={22} color="white" />
               </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.openInMaps(item.coordinates, item.name)}>
               <View style={styles.iconWrapper}>
                  <FontAwesome5 name="directions" size={22} color="white" />
               </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.visitWebsite(item.website)}>
               <View style={styles.iconWrapper}>
                  <AntDesign name="earth" size={22} color="white" />
               </View>
            </TouchableOpacity>
         </View>

         <Divider style={styles.divider} />

      </View>
   )

   // showing selected biz 
   renderSelectedBiz = () => {
      return (
         <View style={styles.panel}>
            <View style={styles.listItemContainer}>
               <View style={styles.selectedBizInfo}>
                  <Text style={styles.bizName}>{this.props.selectedBiz.name}</Text>

                  <Divider style={styles.divider} />
                  <View style={styles.infoLineItem}>
                     <Text style={styles.bizInfo}>{this.props.selectedBiz.desc}</Text>
                  </View>

                  <Divider style={styles.divider} />
                  <View style={styles.infoLineItem}>
                     <Text style={styles.bizInfo}>{this.props.selectedBiz.address}</Text>
                  </View>

                  <Divider style={styles.divider} />
                  <View style={styles.infoLineItem}>
                     <Text style={styles.bizInfo}>{this.props.selectedBiz.hours}</Text>
                  </View>

               </View>

               <View style={styles.listItemLinks}>
                  <TouchableOpacity onPress={() => this.callBusiness(this.props.selectedBiz.tel)}>
                        <View style={ (this.props.selectedBiz.tel === '' || this.props.selectedBiz.tel === undefined) ? {...styles.iconWrapper, ...styles.inactiveLinkStyle} : styles.iconWrapper }>
                           <Feather name="phone-call" size={22} color="white" />
                        </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.openInMaps(this.props.selectedBiz.coordinates, this.props.selectedBiz.name)}>
                     <View style={ (this.props.selectedBiz.coordinates === '' || this.props.selectedBiz.coordinates === undefined) ? {...styles.iconWrapper, ...styles.inactiveLinkStyle} : styles.iconWrapper }>
                        <FontAwesome5 name="directions" size={22} color="white" />
                     </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.visitWebsite(this.props.selectedBiz.website)}>
                     <View style={ (this.props.selectedBiz.website === '' || this.props.selectedBiz.website === undefined) ? {...styles.iconWrapper, ...styles.inactiveLinkStyle} : styles.iconWrapper }>
                        <AntDesign name="earth" size={22} color="white" />
                     </View>
                  </TouchableOpacity>
               </View>

            </View>
         </View>
      )
   }

   // have to make sure this is returned using paren's instead of brackets OR using the return statement
   // showing nearby businesses
   renderNearbyBiz = () => (
      <View style={styles.panel}>
         <FlatList
            data={this.props.bizArr}
            renderItem={this.renderNearbyBizJSX}
            keyExtractor={(item, i) => `${item._id}${i}`}
         />
      </View>
   )

   renderHeader = () => (
      <View style={styles.header}>
         <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
         </View>
      </View>
   )

   snapToOpen() {
      this.bsRef.current.snapTo(0);
   }

   render() {
      return (
         <View style={styles.container}>
            <BottomSheet
               ref={this.bsRef}
               snapPoints={[500, 90]}
               initialSnap={1}
               renderContent={(this.props.bizSelected) ? this.renderSelectedBiz : this.renderNearbyBiz}
               renderHeader={this.renderHeader}
            />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },
   header: {
      // backgroundColor: '#f7f5eee8', // translucent background
      backgroundColor: 'white',
      shadowColor: '#000000',
      paddingTop: 10,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
   },
   panelHeader: {
      alignItems: 'center',
   },
   panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
   },
   panel: {
      height: 500,
      padding: 20,
      // backgroundColor: '#f7f5eee8', // translucent background
      backgroundColor: 'white',
   },
   iconWrapper: {
      // alignment
      justifyContent: 'center',
      alignItems: 'center',
      // circular background
      height: 45,
      width: 45,
      borderRadius: 45/2,
      // backgroundColor: 'white',
      backgroundColor: '#0a431d',
      overflow: 'hidden',
      marginRight: 5,
      marginBottom: 5,
   },
   listItemContainer: {
      flexDirection: "column",
      height: '100%',
      width: '100%',
      justifyContent: 'flex-start',
   },
   listItemInfo: {
      marginTop: 8,
      paddingTop: 12,
   },
   divider: {
      alignSelf: 'center',
      width: '100%',
      height: 1,
      backgroundColor: '#b8b8b8',
   },
   bizName: {
      fontSize: 28,
      paddingBottom: 20,
   },
   bizInfo: {
      fontSize: 16,
      paddingBottom: 20,
      paddingTop: 20,
   },
   infoLineItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
   },
   listItemLinks: {
      flexDirection: "row",
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      height: 40,
      marginTop: 10,
      marginBottom: 20,
   },
   inactiveLinkStyle: {
      backgroundColor: 'grey',
   },
   selectedBizInfo: {
      flexDirection: 'column',
      alignItems: 'flex-start',
   },
})