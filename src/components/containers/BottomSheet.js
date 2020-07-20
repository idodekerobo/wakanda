import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import BottomSheet from 'reanimated-bottom-sheet';
import { Image, Divider } from 'react-native-elements';
import openMap from 'react-native-open-maps';

export default class BottomSheetComponent extends React.Component {

   constructor(props) {
      super(props);
      this.bsRef = React.createRef();
   }

   callBusiness = (tel) => {
      // const num = this.props.selectedBiz.tel;
      Linking.openURL(`tel:${tel}`).catch(e => console.log(e));
   }

   openInMaps = (coordinates, name) => {
      openMap({coordinates, query: name});
   }

   visitWebsite = (website) => {
      // Linking.openURL(this.props.selectedBiz.website);
      Linking.openURL(website);
   }

   extractKey = ({_id}) => _id;

   renderNearbyBizJSX = ({item}) => (
      <View style={styles.listItemContainer}>
         
         {/* <TouchableOpacity> */}
            <View style={styles.listItemPic}>
               <Image
                  source={{url:'https://via.placeholder.com/800x200'}}
                  style={{width: '100%',height: 100}}
               />
            </View>
               
            <View style={styles.listItemInfo}>
               <Text style={styles.listItemInfoText, styles.bizName}>{item.name}</Text>
               <Text style={styles.listItemInfoText, styles.bizInfo}>{item.desc}</Text>
            </View>
         {/* </TouchableOpacity> */}
         
         <View style={styles.listItemLinks}>
            <TouchableOpacity onPress={() => this.callBusiness(item.tel)}>
               <View style={styles.customButtonStyle}>
                  <Text style={styles.customButtonTextStyle}>
                     Call
                  </Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.openInMaps(item.coordinates, item.name)}>
               <View style={styles.customButtonStyle}>
                  <Text style={styles.customButtonTextStyle}>
                  Get Directions
                  </Text>
               </View>
            </TouchableOpacity>
         </View>

      </View>
   )
   
   // showing selected biz 
   renderSelectedBiz = () => {
      return <View style={styles.panel}>
         <View style={styles.listItemContainer}>
            <View style={styles.listItemPic}>
               <Image
                  source={{ url: 'https://via.placeholder.com/800x200' }}
                  style={{ width: '100%', height: 200 }}
               />
            </View>

            <View style={styles.listItemLinks}>
               <TouchableOpacity onPress={() => this.callBusiness(this.props.selectedBiz.tel)}>
                  <View style={styles.customButtonStyle}>
                     <Text style={styles.customButtonTextStyle}>
                        Call
                  </Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity onPress={() => this.openInMaps(this.props.selectedBiz.coordinates, this.props.selectedBiz.name)}>
                  <View style={styles.customButtonStyle}>
                     <Text style={styles.customButtonTextStyle}>
                        Get Directions
                  </Text>
                  </View>
               </TouchableOpacity>
            </View>

            <View style={styles.selectedBizInfo}>
               <Text style={styles.bizName}>{this.props.selectedBiz.name}</Text>
               <Divider style={{ alignSelf: 'center', width: '100%', backgroundColor: '#b8b8b8' }} />

               <Text style={styles.bizInfo}>{this.props.selectedBiz.desc}</Text>
               <Divider style={{ alignSelf: 'center', width: '100%', backgroundColor: '#b8b8b8' }} />

               <Text style={styles.bizInfo}>{this.props.selectedBiz.address}</Text>
               <Divider style={{ alignSelf: 'center', width: '100%', backgroundColor: '#b8b8b8' }} />

               <Text style={styles.bizInfo}>{this.props.selectedBiz.hours}</Text>
            </View>
         </View>
      </View>
   }


   // have to make sure this is returned using paren's instead of brackets OR using the return statement
   // showing nearby businesses
   renderNearbyBiz = () => (
      <View style={styles.panel}>
         <FlatList
            data={this.props.bizArr}
            renderItem={this.renderNearbyBizJSX}
            keyExtractor={this.extractKey}
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
      console.log(this.props.bizArr);
      return (
         <View style={styles.container}>
            <BottomSheet
               ref={this.bsRef}
               snapPoints={[600, 80]}
               initialSnap={1}
               renderContent={ (this.props.bizSelected) ? this.renderSelectedBiz : this.renderNearbyBiz}
               // renderContent={this.renderNearbyBiz}
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
      backgroundColor: '#f7f5eee8',
      shadowColor: '#000000',
      paddingTop: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
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
      height: 600,
      padding: 20,
      backgroundColor: '#f7f5eee8',
    },
    listItemContainer: {
      flexDirection: "column",
      flex: 1,
      marginBottom: 30,
      // height: 300, // remove after testing
    },
    listItemInfo: {
       paddingTop: 12,
    },
    listItemInfoText: {
      //   fontFamily: 'System',
       fontSize: 16,
       paddingBottom: 5,
    },
    listItemLinks: {
      height: 40,
      flexDirection: "row",
      //  justifyContent: "space-evenly",
      justifyContent: "flex-start",
      marginTop: 10,
      marginBottom: 10,
    },
    customButtonStyle: {
      flex: 1,
      backgroundColor: 'blue',
      borderRadius: 5,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      marginRight: 30,
    },
    customButtonTextStyle: {
       color: 'white',
       backgroundColor: 'blue',
    },
    bizName: {
      fontSize: 22,
      marginTop: 10,
      marginBottom: 10,
    },
    bizInfo: {
      fontSize: 14,
      marginTop: 10,
      marginBottom: 10,
    },
    selectedBizInfo: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      // margin: 0,
    },
})