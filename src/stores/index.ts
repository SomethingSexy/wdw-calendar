import PlacesStore from './places';
import PlansStore from './plans';

export default () => ({
  places: new PlacesStore(),
  plans: new PlansStore()
});
