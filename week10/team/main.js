
import { getJSON, getLocation } from './modules/utilities.js';


const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
let urlTimeParams = '&starttime=2019-01-01&endtime=2019-02-02';

function testQuakesByLocation() {
  const geoLocation = getLocation(
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
  const coords = geoLocation.coords;
  debugger;
  console.log(coords);
  // const geoUrl = `${baseUrl}${urlTimeParams}${geoLocation.geoLocationPosition.coords.latitude}`;
  // debugger;
  // quakesResponse = getJSON(geoUrl);
  // console.log(quakesResponse);
}

testQuakesByLocation();