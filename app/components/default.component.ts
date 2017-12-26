import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
    selector: 'default',
    templateUrl: 'app/view/default.html',
    directives: [ROUTER_DIRECTIVES],
})

export class DefaultComponent {
  public titulo = "Portada";
  public identity;
  public token;

  constructor(private _userService: UserService){}

  ngOnInit(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      console.log(this.identity);
  }
}
