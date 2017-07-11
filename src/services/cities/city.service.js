'use strict';


export default class CityService {

    static get $inject(){
        return ['$http', 'API_URL'];
    }

    constructor($http,API_URL) {

        this.$http = $http;
        this.resourceUrl = `${ API_URL }/cities/`;

    }

    static get name(){
        return 'cityService';
    }

    list() {

        let url = this.resourceUrl;
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);

            });

        });

    }
}
