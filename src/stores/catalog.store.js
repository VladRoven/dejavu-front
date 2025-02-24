import CatalogApi from '../API/catalog.api';
import { CatalogSortBy, Sort } from '../utils/constants';
import { makeAutoObservable } from 'mobx';

class CatalogStore {
  product = null;
  products = [];
  categories = [];
  isLoading = {
    product: false,
    products: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async getProducts() {
    if (this.isLoading.products) {
      return;
    }

    try {
      this.isLoading.products = true;

      const response = await CatalogApi.getProducts({
        sort: Sort.DESC,
        sortBy: CatalogSortBy.Date,
      });

      if (response.status === 200) {
        this.products = response.data.data.products;
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      this.isLoading.products = false;
    }
  }
}

export default new CatalogStore();
