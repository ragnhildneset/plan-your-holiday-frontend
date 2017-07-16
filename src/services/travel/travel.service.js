'use strict';


export default class TravelService {

    static get $inject(){
        return ['$http', 'API_URL'];
    }

    constructor($http,API_URL) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/travel`;

    }

    static get name(){
        return 'travelService';
    }

   list() {
        let url = this.resourceUrl + '/getTravels';

        return this.$http.get(url).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });
        });
    }

    get(id) {
        let url = this.resourceUrl + '/getTravel/' + id;
        return this.$http.get(url).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

    getbyUser(username) {
        let url = this.resourceUrl + '/getTravels/' + username;
        return this.$http.get(url).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        })
    }

    getLatest(username) {
        let url = this.resourceUrl + '/getLatest/' + username;
        return this.$http.get(url).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        })
    }

    create(travel) {
        let url = this.resourceUrl + '/postTravel';

        return this.$http.post(url,travel).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        })
    }

}
