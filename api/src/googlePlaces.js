import config from './config';
import fetch from 'node-fetch';


const urlBase = 'https://maps.googleapis.com/maps/api/place';

export const textSearch = (text, lat, long) => 
`${urlBase}/textsearch/json?query=${text}&key=${config.GOOGLE_PLACES_API_KEY}&location=${lat},${long}&radius=500`;

export const detail = id =>
`${urlBase}/details/json?key=${config.GOOGLE_PLACES_API_KEY}&placeid=${id}`;

export const placesTextSearch = (text, lat, long) => fetch(textSearch(text, lat, long))
  .then(async resp => {
    console.log(`completeted text search ${text}`)
    const { results = [] } = await resp.json();
    const places = await Promise.all(
      results.map(({ place_id }) => fetch(detail(place_id)))
    );
    console.log(`finished fetching places for search ${text}`)
    const placesJSON = await Promise.all(
      places.map(place => place.json())
    );
    return placesJSON;
  });
