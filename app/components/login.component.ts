import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit {
  public titulo : string = "Formulario de login"
  public user;
  public errorMessage;
  public identity;
  public token;


  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){

    this._route.params.subscribe(params => {
      let logout = +params["id"];
      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;

        window.location.href="/login";
        //this._router.navigate(["/index"]);
      }
    });

      this.user = {
        "email" : "",
        "password" : "",
        "getHash" : "false"
      };

      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      if(this.identity != null && this.identity.sub){
        this._router.navigate(["/index"]);
      }
  }

  onSubmit(){
    this.user.getHash = 'false';
    this._userService.signUp(this.user).subscribe(
      response => {
        let identity = response;
        this.identity = identity;
        if(identity.length <= 1){
          alert("Error en el servidor");
        }else{
          if(!identity.status){
            localStorage.setItem('identity', JSON.stringify(identity));

            this.user.getHash = 'true';
            this._userService.signUp(this.user).subscribe(
              response => {
                let token = response;
                this.token = token;
                if(token.length <= 0){
                  alert("Error en el servidor");
                }else{
                  if(!token.status){
                    localStorage.setItem('token', token);
                    window.location.href="/";
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
