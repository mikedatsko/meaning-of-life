import axios from 'axios';
import { Store } from '../store';

const host = '';
const api = 'api';

class HttpService {
  constructor() {
    Store.subscribe('filter', (filter) => {
      this.filter = filter;
    });
  }

  createMeaning(name) {
    return axios.post(`${host}/${api}/meaning`, {
      name: name
    })
    .then(response => {
      if (typeof response.data.addedMeanings !== 'undefined') {
        Store.set('maxMeanings', response.data.addedMeanings);
      }

      return response;
    }, error => {
      console.warn(error);
      return error;
    });
  }

  getMeanings() {
    return axios.get(`${host}/${api}/meaning/${this.filter}`)
    .then(response => {
      let meanings = []
      if (response.status === 200) {
        meanings = response.data.obj;
      } else {

      }

      if (typeof response.data.addedMeanings !== 'undefined') {
        Store.set('maxMeanings', response.data.addedMeanings);
      }

      return meanings;
    }, error => {
      console.warn(error);
      return error;
    });
  }

  updateMeaning(id, like) {
    return axios.put(`${host}/${api}/meaning/${id}`, {
      like: like
    })
    .then(response => {
      let meaning = {
        id: ''
      };

      if (response.status === 200) {
        meaning = response.data.obj;
      } else {

      }

      if (typeof response.data.addedMeanings !== 'undefined') {
        Store.set('maxMeanings', response.data.addedMeanings);
      }

      return meaning;
    }, error => {
      console.warn(error);
      return error;
    });
  }
}

export const Http = new HttpService();
