import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../model/user';

@Component({
    selector: 'user-edit',
    templateUrl: 'app/view/user-edit.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService]
})

export class UserEditComponent implements OnInit{
  public titulo : string = "Actualizar mis datos";
  public user : User;
  public errorMessage;
  public status;
  public identity;
  public newPwd;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    let identity = this._userService.getIdentity();
    this.identity = identity;
    if(identity == null){
      this._router.navigate(["/index"]);
    }else{
        this.user = new User(identity.sub,identity.role,identity.name,identity.surname,identity.email,identity.password,"null");
    }
  }

  onSubmit(){
    console.log(this.user);
    this.newPwd = this.user.password;
    if(this.user.password == this.identity.password){
      this.user.password = "";
    }

    this._userService.update_user(this.user).subscribe(
      response => {
        this.status = response.status
        if(this.status != 'success'){
          this.status = 'error';
        }else{
          if(this.newPwd == this.identity.password){
            this.user.password = this.identity.password;
          }else{
            this.user.password = this.newPwd;
          }
          localStorage.setItem('identity', JSON.stringify(this.user));
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
