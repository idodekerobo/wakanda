import React, { useState } from 'react';
import { Formik } from 'formik';
import { StyleSheet, View, } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import * as yup from 'yup';
import * as dbApi from '../../api/firestore-api';

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

const BizForm = (props) => {
   const [submitted, setSubmitted] = useState(false);
   
   return (
         <Formik initialValues={initValues}
            onSubmit={(bizObj, actions) => {
               dbApi.addBusiness(bizObj);
               actions.resetForm();
               props.toggleOverlay();
            }}
            validationSchema={ValidationSchema}
         >

            {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
               
               <View style={styles.formContainer}>
                  <Input placeholder="Name" disabled={(isSubmitting) ? true : false} containerStyle={styles.inputStyle} onChangeText={handleChange('name')} value={values.name} />
                  <Text style={styles.errorText}>
                     {(errors.name) ? "Please enter a name for the business!" : null}
                  </Text>
                  
                  <View style={styles.addressInput}>
                     <Input placeholder="Street Address" containerStyle={[styles.inputStyle, styles.streetAddressInputStyle]} onChangeText={handleChange('streetAddress')} value={values.streetAddress} />
                     <View style={styles.cityStateZip}>
                        <Input placeholder="City" containerStyle={{ ...styles.inputStyle, ...styles.cityInput }} onChangeText={handleChange('city')} value={values.city} />
                        <Input placeholder="State" containerStyle={[styles.inputStyle, styles.stateInput]} onChangeText={handleChange('state')} value={values.state} />
                        <Input placeholder="ZIP" keyboardType="numeric" containerStyle={[styles.inputStyle, styles.zipInput]} onChangeText={handleChange('zip')} value={values.zip} />
                     </View>
                     <Text style={styles.errorText}>
                        {/* {errors.streetAddress || errors.city || errors.state || errors.zip} */}
                        {(errors.streetAddress) ? "Please enter a valid street address!" : (errors.city) ? "Please enter a valid city!" : (errors.state) ? "Please enter a valid state!" : (errors.zip) ? "ZIP code is not required but please enter a valid ZIP code" : null}
                     </Text>
                  </View>

                  <Input placeholder="Phone Number" keyboardType="phone-pad" containerStyle={styles.inputStyle} onChangeText={handleChange('tel')} value={values.tel} />
                  <Text style={styles.errorText}>
                     {(errors.tel) ? "A contact phone number is required!" : null}
                  </Text>

                  <View style={styles.optionalWrapper}>
                     <Input placeholder="Email Address" keyboardType="email-address" containerStyle={[styles.inputStyle]} inputContainerStyle={styles.emailInput} onChangeText={handleChange('email')} value={values.email} />
                     <Text style={(errors.email) ? styles.optionalErr : styles.optional}>
                        {((errors.email) ? "Please enter a valid email address!" : null) || 'Optional'}
                     </Text>

                  </View>
                  
                  <Button title="Submit" onPress={handleSubmit} containerStyle={styles.submitButtonContainerStyle} disabled={isSubmitting} disabledStyle={styles.disabledButtonStyle} titleStyle={(isSubmitting) ? {color: 'lightgrey'} : {}} />
               </View>

            )}
         </Formik>
   );
}
export default BizForm;


const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 50,
      alignItems: 'center',
   },
   formContainer: {
      flex: 1,
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
   },
   inputStyle: {
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
      marginBottom: -15,
   },
   cityStateZip: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
   },
   cityInput: {
      width: '43%',
   },
   stateInput: {
      width: '25%',
   },
   zipInput: {
      width: '27%'
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
      width: '75%',
      alignSelf: 'center',
      marginTop: 13,
   },
   disabledButtonStyle: {
      backgroundColor: 'grey',
   },
})