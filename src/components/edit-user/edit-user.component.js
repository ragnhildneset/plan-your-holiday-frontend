
'use strict';

import template from './edit-user.template.html';
import UserService from './../../services/users/user.service';
import TravelService from './../../services/travel/travel.service';


class EditUserComponent {
    constructor(){
        this.controller = EditUserComponentController;
        this.template = template;
    }

    static get name() {
        return 'editUser';
    }
}

class EditUserComponentController{
    constructor($state, UserService, TravelService){
        this.$state = $state;
        this.UserService = UserService;
        this.TravelService = TravelService;

        this.UserService.getPreferences(this.UserService.getCurrentUser().loginid).then(data => {
          this.username = data.username;
          this.loginID = data.loginid;

          this.email = data.email;
          this.birthday = data.birthday;

          this.density = data.density;
          this.phonenumber = data.phonenumber;
          if(this.phonenumber == 0) {
            this.phonenumber = "";
          }
        });
        document.getElementById("confirmation").style.visibility = "hidden";

        let self = this;
        this.travels = this.TravelService.getbyUser(this.UserService.getCurrentUser().loginid).then(data => {
          self.travels = data;
        });
    }

    savedata() {
      this.phonenumber = parseInt(document.getElementById("phone").value);
      this.email = document.getElementById("mail").value;
      this.density = parseInt(document.getElementById("density").value);

      var user = {"_id": this.UserService.getCurrentUser()._id,
        "username": this.username,
        "loginid": this.loginID,
        "email": this.email,
        "birthday": this.birthday,
        "density": this.density,
        "phonenumber": this.phonenumber
      }

      this.UserService.setPreferences(this.UserService.getCurrentUser()._id, user);
      document.getElementById("confirmation").style.visibility = "visible";
    }

    logout() {
      this.UserService.logout();
      this.$state.go('home');
    }

    attemptdelete() {
      document.getElementById("delete").style="display:inline";
    }

    deleteUser() {
      var id = this.UserService.getCurrentUser()._id;
      this.UserService.logout();
      this.UserService.deleteUser(id).then(data => {
        this.$state.go('home');
      })
    }

    viewTravel(travel) {
      this.$state.go('travel', { travelID: travel._id });
    }

    static get $inject(){
        return ['$state', UserService.name, TravelService.name];
    }
}

export default EditUserComponent;
