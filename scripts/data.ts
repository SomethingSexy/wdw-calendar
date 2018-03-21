import { writeJsonSync } from 'fs-extra';
import { attractions, dining, hours } from 'wdw-data';

const runDining = () => {
  return dining.list().then((results: any) => {
    writeJsonSync('./src/data/dining.json', results);
  });
};

const runAttractions = () => {
  return attractions.list().then((results: any) => {
    writeJsonSync('./src/data/attractions.json', results);
  });
};

const runHours = () => {
  return hours.list().then((results: any) => {
    writeJsonSync('./src/data/hours.json', results);
  });
};

Promise.all([runDining(), runAttractions(), runHours()]).then(() => process.exit());
