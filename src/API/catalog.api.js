import AxiosAgent from './axiosAgent.api';

class CatalogApi {
  async getProducts(filters) {
    return AxiosAgent.get('catalog/list', filters);
  }

  async getProduct(id) {
    return AxiosAgent.get(`product/${id}`);
  }

  async getCategories() {
    return AxiosAgent.get('category/list-extended');
  }
}

export default new CatalogApi();
