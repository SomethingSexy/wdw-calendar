import { action, observable, runInAction } from 'mobx';
import { api } from 'wdw-data';

// TODO: This should come from wdw-data
interface IPlace {
  name: string;
  type: string;
  search: string;
  location: string;
}

interface ILocation {
  name: string;
  id: string;
  areas: string[];
}

const placesQuery = `
query PlacesQuery {
  places {
    id,
    location,
    name,
    type
  }
}
`;

const locationsQuery = `
query LocationsQuery {
  locations {
    id,
    name,
    areas
  }
}
`;

const findLocation = (locations: ILocation[], id: string) => {
  return locations.find((location: ILocation) => location.id === id);
};

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
      const places = await api(placesQuery);
      const locations = await api(locationsQuery);
      const sorted = places.data.places
        .sort(((a: IPlace, b: IPlace) => a.name.localeCompare(b.name)))
        .map((place: IPlace) => ({
          ...place,
          location: findLocation(locations.data.locations,  place.location),
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
