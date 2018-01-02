import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VideoService{
  public url = 'http://localhost:90/curso-fullstack/symfony/web/app_dev.php/video';
  public identity;
  public token;

  constructor(private _http: Http){}

  create(token, video){
    let json = JSON.stringify(video);
    let params =  'json='+json+'&authorization='+token;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this._http.post(this.url+'/new', params, {headers: headers}).map(res => res.json());
  }

  getVideo(id){
    return this._http.get(this.url+'/detail/'+id).map(res => res.json());
  }

  getLatestVideos(){
    return this._http.get(this.url+'/last-videos').map(res => res.json());
  }

  getVideos(page = null){
    if(page == null){
      page = 1;
    }
    return this._http.get(this.url+'/list?page='+page).map(res => res.json());
  }
}
