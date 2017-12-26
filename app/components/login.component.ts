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
  public identity;
  public token;


  constructor(private _loginService: LoginService){}

  ngOnInit(){
      this.user = {
        "email" : "",
        "password" : "",
        "getHash" : "false"
      };

      let ide = this._loginService.getIdentity();
      let tk = this._loginService.getToken();
      console.log(ide);
      console.log(tk);
  }

  onSubmit(){
    this.user.getHash = 'false';
    this._loginService.signUp(this.user).subscribe(
      response => {
        let identity = response;
        this.identity = identity;
        if(identity.length <= 1){
          alert("Error en el servidor");
        }else{
          if(!identity.status){
            localStorage.setItem('identity', JSON.stringify(identity));

            this.user.getHash = 'true';
            this._loginService.signUp(this.user).subscribe(
              response => {
                let token = response;
                this.token = token;
                if(token.length <= 0){
                  alert("Error en el servidor");
                }else{
                  if(!token.status){
                    localStorage.setItem('token', token);
                    //redireccio
                  }
                }
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
