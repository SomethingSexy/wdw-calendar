import Places from './places';
import Plans from './plans';
import Trip from './trip';
import Ui from './ui';

export default () => {
  const places = new Places();
  const plans = new Plans(places);
  const ui = new Ui();
  const trip = new Trip(plans, ui);

  return {
    places,
    plans,
    trip,
    ui
  };
};
