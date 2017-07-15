'use strict';


export default class UserService {

    static get $inject(){
        return ['$http', '$window','API_URL'];
    }

    constructor($http,$window,API_URL)
    {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
        this.resourceUrl = `${ API_URL }/user/`;
    }

    static get name(){
        return 'UserService';
    }

    register(username, email, loginid, password, birthdate, density) {
        return this.$http.post(`${ this.API_URL }/user/signup`, {
          username : username,
          loginid : loginid,
          password : password,
          email : email,
          birthday : birthdate,
          density : density
        });
    }

    login(user, pass) {
        return this.$http.post(`${ this.API_URL }/user/login`, {
            username: user,
            password: pass
        });
    }

    logout(){
        this.$window.localStorage.removeItem('jwtToken');
    }

    getCurrentUser() {
        let token = this.$window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(this.$window.atob(base64)).user;
    }

    getPreferences(userid) {
        let url = this.resourceUrl + "getPreferences/" + userid;
        return this.$http.get(url).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

    setPreferences(id, body) {
        return this.$http.put(this.resourceUrl + "setPreferences/" + id, body);
    }

    deleteUser(id) {
        return this.$http.delete(this.resourceUrl + id).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.status);
            });
        });
    }

    isAuthenticated() {
        return !!this.$window.localStorage['jwtToken'];
    }
}
