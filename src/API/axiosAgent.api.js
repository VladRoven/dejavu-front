import axios from 'axios';

class AxiosAgent {
  path = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}${
    process.env.REACT_APP_API_PORT ? `:${process.env.REACT_APP_API_PORT}` : ''
  }${process.env.REACT_APP_API_PREFIX}/`;

  async get(path, params, headers, responseType) {
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return axios.get(this.path + path, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      params: params ?? {},
      responseType: responseType ?? 'json',
    });
  }

  async post(path, body, headers, params, responseType) {
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return axios.post(this.path + path, body, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      params: params ?? {},
      responseType: responseType ?? 'json',
    });
  }

  async put(path, body, headers, params, responseType) {
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return axios.put(this.path + path, body, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      params: params ?? {},
      responseType: responseType ?? 'json',
    });
  }

  async delete(path, params, headers, responseType) {
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return axios.delete(this.path + path, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      params: params ?? {},
      responseType: responseType ?? 'json',
    });
  }
}

export default new AxiosAgent();
