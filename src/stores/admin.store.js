import AdminApi from '../API/admin.api';
import CatalogApi from '../API/catalog.api';
import { PopupTypes } from '../utils/constants';
import CatalogStore from './catalog.store';
import PageStore from './page.store';
import { isNull } from 'lodash';
import { makeAutoObservable } from 'mobx';

class AdminStore {
  product = null;
  productFormMode = null;
  isLoading = {
    product: false,
    image: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setProductFormMode(mode) {
    this.productFormMode = mode;
  }

  async getProduct(id) {
    if (this.isLoading.product) {
      return;
    }

    try {
      this.isLoading.product = true;

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

  async createProduct(product) {
    if (this.isLoading.product) {
      return;
    }

    try {
      this.isLoading.product = true;

      const response = await AdminApi.createProduct(product);

      if (response.status === 200) {
        this.productFormMode = null;
        CatalogStore.getProducts();
        PageStore.setPopupMessage({
          type: PopupTypes.Info,
          message: 'Product created successfully.',
        });
      }
    } catch (e) {
      PageStore.errorHandler(e);
    } finally {
      this.isLoading.product = false;
    }
  }

  async updateProduct(product) {
    if (this.isLoading.product) {
      return;
    }

    try {
      this.isLoading.product = true;

      const response = await AdminApi.updateProduct(product);

      if (response.status === 200) {
        this.productFormMode = null;
        CatalogStore.getProducts();

        if (!isNull(CatalogStore.product)) {
          CatalogStore.getProduct(product.id);
        }

        PageStore.setPopupMessage({
          type: PopupTypes.Info,
          message: 'Product updated successfully.',
        });
      }
    } catch (e) {
      PageStore.errorHandler(e);
    } finally {
      this.isLoading.product = false;
    }
  }

  async removeProduct(id) {
    if (this.isLoading.product) {
      return;
    }

    try {
      this.isLoading.product = true;

      const response = await AdminApi.removeProduct(id);

      if (response.status === 200) {
        CatalogStore.getProducts();
        PageStore.setPopupMessage({
          type: PopupTypes.Info,
          message: 'Product deleted successfully.',
        });
      }
    } catch (e) {
      PageStore.errorHandler(e);
    } finally {
      this.isLoading.product = false;
    }
  }

  async removeImage(id) {
    if (this.isLoading.image) {
      return;
    }

    try {
      this.isLoading.image = true;
      await AdminApi.removeImage(id);
    } catch (e) {
    } finally {
      this.isLoading.image = false;
    }
  }
}

export default new AdminStore();
