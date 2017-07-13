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
        let url = this.resourceUrl+'/getTravels';

        return this.$http.get(url).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.data);

            });
        });
    }

    get(id) {
         let url = `${ this.resourceUrl } ${ id }`;

         return this.$http.get(url).then(responce => {
             return new Promise((resolve, reject) => {
                 resolve(responce.data);
             });
         });
     }
}
