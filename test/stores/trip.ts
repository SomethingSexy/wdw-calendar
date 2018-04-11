import { expect } from 'chai';
import 'mocha';
import PlacesStore from '../../src/stores/places';
import PlansStore from '../../src/stores/plans';
import TripStore from '../../src/stores/trip';

describe('stores - trip', () => {
  it('should set', () => {
    const placesStore = new PlacesStore();
    const plansStore = new PlansStore(placesStore);
    const store = new TripStore(plansStore);

    store.set({ dateStart: '02/01/1985', days: 5, interval: '30m' });

    expect(store.dateStart).to.equal('02/01/1985');
    expect(store.days).to.equal(5);
    expect(store.interval).to.equal('30m');
  });
});
