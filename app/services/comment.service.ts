import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CommentService{
  public url = 'http://localhost:90/curso-fullstack/symfony/web/app_dev.php/comment';

  constructor(private _http: Http){}

  create(token, comment){
    let json = JSON.stringify(comment);
    let params =  'json='+json+'&authorization='+token;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this._http.post(this.url+'/new', params, {headers: headers}).map(res => res.json());
  }

  getCommentsOfVideo(video_id){
    return this._http.get(this.url+'/list/'+video_id).map(res => res.json());
  }

  delete(token,id){
    let params =  'authorization='+token;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this._http.post(this.url+'/delete/'+id, params, {headers: headers}).map(res => res.json());
  }
}
