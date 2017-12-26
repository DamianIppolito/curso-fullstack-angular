import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
    selector: 'default',
    templateUrl: 'app/view/default.html',
    directives: [ROUTER_DIRECTIVES],
})

export class DefaultComponent {
  public titulo = "Portada";
  public identity;
  public token;

  constructor(private _loginService: LoginService){}

  ngOnInit(){
      this.identity = this._loginService.getIdentity();
      this.token = this._loginService.getToken();
      console.log(this.identity);
  }
}
