import AxiosAgent from './axiosAgent.api';

class AdminApi {
  async createProduct(product) {
    return AxiosAgent.post('product', product);
  }

  async updateProduct(product) {
    return AxiosAgent.put('product', product);
  }

  async removeProduct(id) {
    return AxiosAgent.delete(`product/${id}`);
  }

  async removeImage(id) {
    return AxiosAgent.delete(`product/image/${id}`);
  }
}

export default new AdminApi();
