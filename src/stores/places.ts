import { action, observable, runInAction } from 'mobx';
import { api } from 'wdw-data';

export interface IPlacesStore {
  all: IPlace[];
  findById: (id: string) => IPlace | undefined;
}

// TODO: This should come from wdw-data
interface IPlace {
  id: string;
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

class PlacesStore implements IPlacesStore {
  @observable public isLoading = false;
  @observable public all: IPlace[] = [];
  @observable public list: IPlace[] = [];
  @observable public page: IPlace[] = [];
  @observable public loaded = false;
  @observable public selectedFilter = 'all';
  @observable public currentPage = 1;
  @observable public totalPages = 0;
  public perPage = 20;

  @action
  public async fetch() {
    // if (this.loaded) {
    //   return;
    // }

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
        this.all = [...sorted];
        this.totalPages = Math.ceil(this.all.length / this.perPage);
        this.isLoading = false;
        this.loaded = true;
        this.list = sorted;
        this.page = sorted.slice(0, this.perPage);
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  public findById(id: string) {
    return this.all.find(place => place.id === id);
  }

  @action
  public filter(type: string) {
    this.list = type === 'all' ? [...this.all] : this.all.filter(place => place.type === type);
    this.totalPages = Math.ceil(this.list.length / this.perPage);
    this.selectedFilter = type;
    this.goToPage(1);
  }

  @action
  public search(term: string) {
    this.list = this.all.filter(place => place.search.includes(term));
  }

  @action
  public goToPage(page: number) {
    if (page <= this.totalPages && page > 0) {
      const start = page === 1 ? 0 : page * this.perPage;
      const end = start + this.perPage;

      const nextPage = this.list.slice(start, end > this.list.length ? this.list.length : end);
      if (nextPage.length > 0) {
        this.page = nextPage;
        this.currentPage = page;
      }
    }
  }

  @action
  public nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  @action
  public previousPage() {
    this.goToPage(this.currentPage - 1);
  }
}

export default PlacesStore;
