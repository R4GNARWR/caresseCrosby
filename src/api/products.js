import axios from 'axios';

axios.defaults.baseURL = 'https://api.ccrosby.ru/api/';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8'
axios.defaults.headers.common['xMarketGroup']='4'
axios.defaults.headers.common['xProjectId']='2'

export default {
    getPopularProducts() {
      return axios.get('popular-products')
        .catch(function (error) {
          console.log(error);
        })
    },
    getAllProducts() {
        return axios.get('products')
          .catch(function (error) {
            console.log(error);
          })
      }
  }

