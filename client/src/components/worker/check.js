const axios = require('axios');

const reverseGeocode = async (lat, lng) => {
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenCage API key
//   const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${''}`;
// const url =  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${12.88065090949135047},${79.1371247988384}&key=${'AIzaSyC1XXmP4oSiIjSTYydBACXh1Sr1YfjlMZA'}`;
// const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC1XXmP4oSiIjSTYydBACXh1Sr1YfjlMZA`
const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
try {
    const response = await axios.get(url);
    // console.log(response)
    console.log(response.data.address); // This will return the address
  } catch (error) { 
    console.error(error);
  }
}

reverseGeocode( 11.0420173, 76.9758697);

