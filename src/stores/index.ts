import Places from './places';
import Plans from './plans';

export default () => {
  const places = new Places();
  // plans gets access to places
  const plans = new Plans(places);

  return {
    places,
    plans
  };
};
