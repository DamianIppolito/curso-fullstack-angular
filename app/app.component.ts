// Importar el núcleo de Angular
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from './services/user.service';
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'my-app',
    templateUrl: 'app/view/layout.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService]
})

// Clase del componente donde irán los datos y funcionalidades
export class AppComponent {
  public identity;
  public token;

  constructor(private _userervice: UserService){}

  ngOnInit(){
      this.identity = this._userervice.getIdentity();
      this.token = this._userervice.getToken();
  }

}
