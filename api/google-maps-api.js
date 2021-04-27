// const campesinoLatLng = '29.746115771150023,-95.39420396098438';

export const fetchGoogleMapsApi = async (latlngString) => {
   const baseGeocodeApiUrl = 'https://maps.googleapis.com/maps/api/geocode/';
   const outputFormat = 'json';

   const completeUrl = `${baseGeocodeApiUrl}${outputFormat}` + `?` + `latlng=${latlngString}` + `&` + `key=${AFE_GOOGLE_MAPS_API_KEY}`;
   try {
      return fetch(completeUrl)
      .then(response => {
         return response.json();
      })
      .then(jsonData => {
         return jsonData;
      })
   } catch (e) {
      console.log(`error getting data from google maps api`);
      console.log(e);
   }
}

export const convertGoogleMapsApiResponseToState = async (apiResponse) => {
   const results = apiResponse.results;
   const firstResult = results[0];
   const addressComponents = firstResult.address_components; // this is an array
   
   const stateType = `administrative_area_level_1`;
   let state = '';
   
   for (let i=0; i < addressComponents.length; i++) {
      const iteration = addressComponents[i];
      const typesArr = iteration.types;
      if (!typesArr.includes(stateType)) continue;
      // console.log(iteration.long_name);
      // console.log(iteration.short_name);
      state = iteration.long_name;
   }

   return state;
}