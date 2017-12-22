import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';

@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers: [LoginService]
})

export class LoginComponent implements OnInit {
  public titulo : string = "Formulario de login"
  public user;
  public errorMessage;

  constructor(private _loginService: LoginService){}

  ngOnInit(){
      this.user = {
        "email" : "",
        "password" : "",
        "gethash" : "false"
      };
  }

  onSubmit(){
    this._loginService.signUp(this.user).subscribe(
      response => {
        console.log(response);
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }
}
