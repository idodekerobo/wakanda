import React, { useState } from 'react';
import { Formik } from 'formik';
import { StyleSheet, View, } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import * as yup from 'yup';
import { addBusiness } from '../../api/firestore-api';

const initValues = {
   name: '',
   category: '',
   streetAddress: '',
   city: '',
   state: '',
   zip: '',
   tel: '',
   email: '',
   desc: '',
   hours: '',
   website: '',
   coordinates: '',
}

const ValidationSchema = yup.object({
   name: yup.string().required(),
   streetAddress: yup.string().required(),
   city: yup.string().required(),
   state: yup.string().required(),
   zip: yup.number(),
   tel: yup.string().required(),
   email: yup.string().email(),
})

const BizForm = ({ toggleOverlay }) => {
   const [submitted, setSubmitted] = useState(false);
   
   return (
         <Formik initialValues={initValues}
            onSubmit={(bizObj, actions) => {
               addBusiness(bizObj);
               actions.resetForm();
               toggleOverlay();
            }}
            validationSchema={ValidationSchema}
         >

            {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
               
               <View style={styles.formContainer}>
                  <View style={styles.inputFieldWrapperView}>
                     <Input placeholder="Business Name" disabled={(isSubmitting) ? true : false} inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle} onChangeText={handleChange('name')} value={values.name} />
                     <Text style={styles.errorText}>
                        {(errors.name) ? "Please enter a name for the business!" : null}
                     </Text>
                     
                     <View style={styles.addressInput}>
                        <Input placeholder="Street Address" inputStyle={styles.inputStyle} containerStyle={[styles.inputContainerStyle, styles.streetAddressInputStyle]} onChangeText={handleChange('streetAddress')} value={values.streetAddress} />
                        <View style={styles.cityStateZipContainer}>
                           <Input placeholder="City" inputStyle={styles.inputStyle} containerStyle={{ ...styles.inputContainerStyle, ...styles.cityInput }} onChangeText={handleChange('city')} value={values.city} />
                           <View style={styles.stateZipContainer}>
                              <Input placeholder="State" inputStyle={styles.inputStyle} containerStyle={[styles.inputContainerStyle, styles.stateInput]} onChangeText={handleChange('state')} value={values.state} />
                              <Input placeholder="ZIP" keyboardType="numeric" inputStyle={styles.inputStyle} containerStyle={[styles.inputContainerStyle, styles.zipInput]} onChangeText={handleChange('zip')} value={values.zip} />
                           </View>
                        </View>
                        <Text style={styles.errorText}>
                           {/* {errors.streetAddress || errors.city || errors.state || errors.zip} */}
                           {(errors.streetAddress) ? "Please enter a valid street address!" : (errors.city) ? "Please enter a valid city!" : (errors.state) ? "Please enter a valid state!" : (errors.zip) ? "ZIP code is not required but please enter a valid ZIP code" : null}
                        </Text>
                     </View>

                     <Input placeholder="Phone Number" keyboardType="phone-pad" inputStyle={styles.inputStyle} containerStyle={styles.inputContainerStyle} onChangeText={handleChange('tel')} value={values.tel} />
                     <Text style={styles.errorText}>
                        {(errors.tel) ? "A contact phone number is required!" : null}
                     </Text>

                     <View style={styles.optionalWrapper}>
                        {/* <Input placeholder="Email Address" keyboardType="email-address" inputStyle={styles.inputStyle} containerStyle={[styles.inputContainerStyle]} inputContainerStyle={styles.emailInput} onChangeText={handleChange('email')} value={values.email} />
                        <Text style={(errors.email) ? styles.optionalErr : styles.optional}>
                           {((errors.email) ? "Please enter a valid email address!" : null) || 'Optional'}
                        </Text> */}

                     </View>

                  </View>
                  
                  <View style={styles.buttonWrapperView}>
                     <Button title="Submit" onPress={handleSubmit} containerStyle={styles.submitButtonContainerStyle} buttonStyle={styles.submitButtonStyle} disabled={isSubmitting} disabledStyle={styles.disabledButtonStyle} titleStyle={(isSubmitting) ? {color: 'lightgrey', fontSize: 24, fontWeight: '500',} : {fontSize: 24,fontWeight: '500',}} />
                  </View>
               </View>

            )}
         </Formik>
   );
}
export default BizForm;


const styles = StyleSheet.create({
   // container: {
   //    flex: 1,
   //    paddingTop: 50,
   //    // height: '100%',
   //    display: 'flex',
   //    flexDirection: 'column',
   //    justifyContent: 'space-between',
   // },
   formContainer: {
      flex: 1,
      width: '90%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      // alignItems: 'flex-start',
   },
   inputFieldWrapperView: {
      flex: 1,
      width: '100%',
   },
   buttonWrapperView: {},
   inputStyle: {
      color: "#0a431d",
   },
   inputContainerStyle: {
      width: '95%',
      
   },
   errorText: {
      color: 'red',
      margin: 0,
      marginTop: -18,
      marginLeft: 10,
      padding: 0,
   },
   categoryLabel: {
      marginLeft: 10,
   },
   addressInput: {
      marginTop: 8,
      marginBottom: 8,
      display: 'flex',
      width: '100%',
   },
   streetAddressInputStyle: {
      // marginBottom: -15,
   },
   cityStateZipContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
   },
   stateZipContainer: {
      display: 'flex',
      flexDirection: 'row',
   },
   cityInput: {
      width: '95%',
   },
   stateInput: {
      width: '67%',
   },
   zipInput: {
      width: '28%'
   },
   optionalWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
   },
   emailInput: {
      marginBottom: -20,
   },
   optional: {
      marginLeft: 10,
      marginBottom: 7,
   },
   optionalErr: {
      color: 'red',
      marginLeft: 10,
      marginBottom: 7,
   },
   submitButtonContainerStyle: {
      width: '90%',
      alignSelf: 'center',
      marginTop: 13,
      marginBottom: 30,
   },
   submitButtonStyle: {
      backgroundColor: "#0a431d",
   },
   disabledButtonStyle: {
      backgroundColor: 'grey',
   },
})