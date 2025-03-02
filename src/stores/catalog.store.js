import CatalogApi from '../API/catalog.api';
import { CatalogSortBy, Sort } from '../utils/constants';
import PageStore from './page.store';
import { makeAutoObservable } from 'mobx';

class CatalogStore {
  product = null;
  products = [];
  categories = [];
  isLoading = {
    product: false,
    products: false,
    categories: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async getProducts(filters) {
    if (this.isLoading.products) {
      return;
    }

    try {
      this.isLoading.products = true;

      const response = await CatalogApi.getProducts(
        filters ?? {
          sort: Sort.DESC,
          sortBy: CatalogSortBy.Date,
        }
      );

      if (response.status === 200) {
        this.products = response.data.data.products;
      }
    } catch (e) {
      PageStore.errorHandler(e);
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
      PageStore.errorHandler(e);
    } finally {
      this.isLoading.product = false;
    }
  }

  async getCategories() {
    if (this.isLoading.categories) {
      return;
    }

    try {
      const response = await CatalogApi.getCategories();

      if (response.status === 200) {
        this.categories = response.data.data.categories;
      }
    } catch (e) {
      PageStore.errorHandler(e);
    } finally {
      this.isLoading.product = false;
    }
  }

  clearProduct() {
    this.product = null;
  }

  clearProducts() {
    this.products = [];
  }
}

export default new CatalogStore();
