import { action, observable, runInAction } from 'mobx';
import { api } from 'wdw-data';

const query = `
query PlacesQuery {
  places {
    id
  }
}
`;

class PlacesStore {
  @observable public isLoading = false;
  @observable public places = [];

  @action
  public async fetch() {
    this.places = [];
    this.isLoading = true;
    try {
      const places = await api(query);
      // after await, modifying state again, needs an actions:
      runInAction(() => {
        this.isLoading = false;
        this.places = places.data.places;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export default PlacesStore;
