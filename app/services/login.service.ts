import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService{
  public url = 'http://localhost:90/curso-fullstack/symfony/web/app_dev.php';

  constructor(private _http: Http){}

  signUp(user_to_login){
    let json = JSON.stringify(user_to_login);
    let params =  'json='+json;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this._http.post(this.url+'/login', params, {headers: headers}).map(res => res.json());
  }
}
