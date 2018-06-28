// setup env vars before doing anything else!
import './env';
import config from './config'
import Koa from 'koa';
import fetch from 'node-fetch';
import { not, isNil } from 'ramda';

import { placesTextSearch } from './googlePlaces';

if (process.env.NODE_ENV === 'development')
  console.warn('running in development mode!');

const app = new Koa();

const lat = 51.583995;
const long = -0.030341;


// response
app.use(async function(ctx) {
  const { lat, long } = ctx.request.query;
  if (!lat || !long) throw Error('please provide lat lng')
  const results = await Promise.all([
    placesTextSearch('community center', lat, long),
    placesTextSearch('community', lat, long),
    placesTextSearch('church', lat, long),
    placesTextSearch('hall', lat, long),
    placesTextSearch('school', lat, long),
    placesTextSearch('club', lat, long),
    placesTextSearch('society', lat, long),
    placesTextSearch('neighbourhood', lat, long),
    placesTextSearch('local', lat, long),
    placesTextSearch('arts', lat, long),
  ])
  const joined = results.reduce((acc, result) => {
    return [...acc, ...result];
  }, [])
  const sites = joined.map(({ result = {} }) => result.website).filter(x => not(isNil(x)))
  console.log(sites)
  ctx.response.body = joined;
});


app.listen(config.PORT);
console.info(`app running on port ${config.PORT}...`)

// log unhandled promise rejections to the console
process.on('unhandledRejection', error => {
  console.error('unhandledRejection:', error);
  process.exit(1);
});
