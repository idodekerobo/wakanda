import { FETCH_BIZ_DATA, GET_LOCATION } from './ActionCreators';

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