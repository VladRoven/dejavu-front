import AxiosAgent from './axiosAgent.api';

class CatalogApi {
  async getProducts(filters) {
    return AxiosAgent.get('catalog/list', filters);
  }
}

export default new CatalogApi();
