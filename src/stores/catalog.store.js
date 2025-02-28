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

  async getProduct(id) {
    if (this.isLoading.product) {
      return;
    }

    try {
      const response = await CatalogApi.getProduct(id);

      if (response.status === 200) {
        this.product = response.data.data;
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      this.isLoading.product = false;
    }
  }
}

export default new CatalogStore();
