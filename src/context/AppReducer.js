import { FETCH_BIZ_DATA, GET_LOCATION, SELECTED_CATEGORY, SET_PINNED_BUSINESS_ID_ARR, FETCH_STAR_PIN } from './ActionCreators';

// how we specify how app state changes in response to certain actions to our store
export const Reducer = (state, action) => {
   switch (action.type) {
      case FETCH_BIZ_DATA: 
         return {
            ...state,
            bizArr: action.arr // action.___ whatever we're passing into the actionCreator function
         };
      case GET_LOCATION:
         return {
            ...state,
            location: action.location 
         };
      case SELECTED_CATEGORY: 
         return {
            // do stuff
            ...state, 
            selectedCategories: action.selectedCategories,
         };
      case SET_PINNED_BUSINESS_ID_ARR:
         return {
            ...state, 
            pinnedBusinessIds: action.pinnedBusinessIds,
         }
      case FETCH_STAR_PIN:
         return {
            ...state, 
            starPinUrl: action.starPinUrl,
         }
      default: 
         return state;
   }
}


/*
global state need to be accessed anywhere

1. user permission for phone location data

2. user location coordinates

3. biz array
   getData = async () => {
      const bizArr = await dbApi.getAllBusinesses();
      this.setState({bizArr});
   }

*/