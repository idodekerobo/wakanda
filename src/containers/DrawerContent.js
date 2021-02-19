import React, { useState, useContext } from 'react';
import { CheckBox, } from 'react-native-elements'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Text, StyleSheet } from 'react-native';
import { GlobalContext } from '../context/GlobalState';
import { SELECTED_CATEGORY } from '../context/ActionCreators';

const selectAllBox = {name: 'All',checked: true, categoryKey: 0};
const categories = [
   {name: 'Food',checked: true, categoryKey: 1},
   {name: 'Cosmetic',checked: true, categoryKey: 2},
   {name: 'Arts',checked: true, categoryKey: 3},
   {name: 'Other',checked: true, categoryKey: 4},
];

const DrawerContent = (props) => {
   const { state, dispatch } = useContext(GlobalContext);
   const [ selectAll, setSelectAll ] = useState(selectAllBox);
   const [ checkboxes, setCheckboxes ] = useState(categories);

   const onSelectAllClick = () => {
      const newState = {...selectAll, checked: !selectAll.checked}
      setSelectAll(newState);

      // if selectAll is checked, make all of the checkboxes selected
      if (newState.checked) {
         let newCheckboxState = [ ];
         for (let i=0; i < checkboxes.length; i++) {
            newCheckboxState = [...newCheckboxState, {...checkboxes[i], checked: true}]
         }
         setCheckboxes(newCheckboxState);
         
         // edit global state array that has highlighted categories
         if (state.selectedCategories.includes(newState.categoryKey)) return
         const newSelectedCategoryArr = [...state.selectedCategories, newState.categoryKey ];
         dispatch({type: SELECTED_CATEGORY, selectedCategories: newSelectedCategoryArr});
      } else {
         if (!state.selectedCategories.includes(newState.categoryKey)) return
         const newSelectedCategoryArr = state.selectedCategories.filter(el => el !== newState.categoryKey)
         dispatch({type: SELECTED_CATEGORY, selectedCategories: newSelectedCategoryArr});
      }

   }

   const onCheckboxClick = (el) => {
      let checkedVal;
      let newState = checkboxes.map(oldCheckbox => {
         if (oldCheckbox.name === el.name) {
            checkedVal = !oldCheckbox.checked;
            return {...oldCheckbox, checked: checkedVal}
         } else {
            return oldCheckbox;
         }
         // return oldCheckbox.name === el.name ? {...oldCheckbox, checked: !oldCheckbox.checked} : oldCheckbox 
      });
      
      setCheckboxes(newState);
      if (newState.some(el => el.checked === false)) setSelectAll({...selectAll, checked: false}) // if ANY of the checkboxes are false, make selectAll false
      if (newState.every(el => el.checked === true)) setSelectAll({...selectAll, checked: true}) // if ALL of the checkboxes are true, make selectAll true
      
      // updating global state
      if (checkedVal) {
         if (state.selectedCategories.includes(el.categoryKey)) return;
         let newSelectedCategoryArr = [...state.selectedCategories, el.categoryKey];
         dispatch({type: SELECTED_CATEGORY, selectedCategories: newSelectedCategoryArr});
      } else {
         console.log(`name: ${el.name} checked: ${checkedVal} key: ${el.categoryKey}`)
         if (!state.selectedCategories.includes(el.categoryKey)) return;
         
         // removing the all index automatically
         let newSelectedCategoryArr = state.selectedCategories.filter(key => (key !== el.categoryKey && key !== 0));
         console.log(`old selectedcategoryArr ${state.selectedCategories}`)
         console.log(`new selected cat arr ${newSelectedCategoryArr}`)
         dispatch({type: SELECTED_CATEGORY, selectedCategories: newSelectedCategoryArr});
      }
   }

   const categoryCheckboxes = checkboxes.map((el, i) => {
      return <CheckBox title={el.name} key={i} containerStyle={styles.checkboxStyle} textStyle={styles.checkboxTextStyle} checkedColor={styles.checkedColor.color} checked={el.checked} onPress={() => onCheckboxClick(el)}/>
   })

   return (
      <DrawerContentScrollView {...props}>
         <DrawerItemList {...props} />
         {/* <DrawerItem label="Categories" onPress={() => console.log(`Pressed category label`)}/> */}
            <Text style={styles.labelStyle}>Categories</Text>
            <CheckBox title={selectAll.name} containerStyle={styles.checkboxStyle} textStyle={styles.checkboxTextStyle} checkedColor={styles.checkedColor.color} checked={selectAll.checked} onPress={onSelectAllClick} />
            {categoryCheckboxes}
      </DrawerContentScrollView>
   )
}

export default DrawerContent;

const styles = StyleSheet.create({
   labelStyle: {
      marginLeft: 17,
      fontSize: 21,
      fontWeight: '400',
      color: '#0a431d',
      // color: '#fff'
   },
   checkboxStyle: {
      // backgroundColor: '#f2fff7',
      // backgroundColor: '#d5e8dc',
      // backgroundColor: '#0a431d',
      // borderColor: '#0a431d',
   },
   checkboxTextStyle: {
      // color: '#fff'
   },
   checkedColor: {
      color: '#0a431d'
   },
   // checkedColor: {
   //    color: '#fff'
   // },
})