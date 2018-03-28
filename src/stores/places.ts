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
interface IPlace {
  name: string;
  type: string;
  search: string;
}

class PlacesStore {
  @observable public isLoading = false;
  @observable public all: IPlace[] = [];
  @observable public list: IPlace[] = [];
  @observable public loaded = false;
  @observable public selectedFilter = 'all';

  @action
  public async fetch() {
    if (this.loaded) {
      return;
    }

    this.list = [];
    this.all = [];
    this.isLoading = true;
    try {
      const places = await api(query);
      const sorted = places.data.places
        .sort(((a: IPlace, b: IPlace) => a.name.localeCompare(b.name)))
        .map((place: IPlace) => ({
          ...place,
          search: place.name.toLowerCase()
        }));
      // after await, modifying state again, needs an actions:
      runInAction(() => {
        this.isLoading = false;
        this.loaded = true;
        this.list = sorted;
        this.all = [...sorted];
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  @action
  public filter(type: string) {
    this.list = type === 'all' ? [...this.all] : this.all.filter(place => place.type === type);
    this.selectedFilter = type;
  }

  @action
  public search(term: string) {
    this.list = this.all.filter(place => place.search.includes(term));
  }
}

export default PlacesStore;
