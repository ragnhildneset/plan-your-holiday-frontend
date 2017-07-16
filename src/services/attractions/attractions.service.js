'use strict';


export default class AttractionsService {

    static get $inject(){
        return ['$http', 'API_URL'];
    }

    constructor($http,API_URL) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/attractions/`;
    }

    static get name(){
        return 'attractionsService';
    }

    list() {
        let url = this.resourceUrl;
        return this.$http.get(url).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });
        });
    }

    city(cityId) {
        let url = `${ this.resourceUrl }city/${ cityId }`;
        return this.$http.get(url).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    best() {
        let url = this.resourceUrl + 'top/10/';
        return this.$http.get(url).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });
        });
    }

    allBest() {
        let url = this.resourceUrl + 'top/';
        return this.$http.get(url).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });
        });
    }

    getTop(limit, category) {
        let url = this.resourceUrl + 'top/' + limit + '/' + category;
        return this.$http.get(url).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });
        });
    }

    rate(ratings) {
      let url = this.resourceUrl + 'rating/'
      return this.$http.post(url, JSON.stringify(ratings)).then(responce => {
          return new Promise((resolve, reject) => {
              resolve(responce.data);
          });
      });
    }
}
