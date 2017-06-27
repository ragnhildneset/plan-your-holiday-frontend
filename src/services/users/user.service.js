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
        console.log('Login en User Service');
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

    isAuthenticated() {
        return !!this.$window.localStorage['jwtToken'];
    }


}