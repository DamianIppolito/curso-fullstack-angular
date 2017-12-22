import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html'
})

export class LoginComponent implements OnInit {
  public titulo : string = "Formulario de login"
  public user;

  ngOnInit(){
      this.user = {
        "email" : "",
        "password" : "",
        "gethash" : "false"
      };
  }

  onSubmit(){
    console.log(this.user);
  }
}
