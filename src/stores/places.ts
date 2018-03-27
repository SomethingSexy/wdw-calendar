import { action, observable, runInAction } from 'mobx';
import { api } from 'wdw-data';

const query = `
query PlacesQuery {
  places {
    id,
    name,
    type
  }
}
`;

// TODO: This should come from wdw-data
interface IPlan {
  name: string;
}

class PlacesStore {
  @observable public isLoading = false;
  @observable public places = [];

  @action
  public async fetch() {
    this.places = [];
    this.isLoading = true;
    try {
      const places = await api(query);
      const sorted = places.data.places
        .sort(((a: IPlan, b: IPlan) => a.name.localeCompare(b.name)));
      // after await, modifying state again, needs an actions:
      runInAction(() => {
        this.isLoading = false;
        this.places = sorted;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export default PlacesStore;
