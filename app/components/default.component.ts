import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {VideoService} from '../services/video.service';
@Component({
    selector: 'default',
    templateUrl: 'app/view/default.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService, VideoService]
})

export class DefaultComponent {
  public titulo = "Portada";
  public identity;
  public token;
  public videos;
  public errorMessage;
  public status;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.getAllVideos();
      console.log(this.identity);
  }

  getAllVideos(){
    this._route.params.subscribe(
      params => {
        let page = +params["page"];
        if(!page){
          page = 1;
        }
        this._videoService.getVideos(page).subscribe(
          response => {
            this.status = response.status;
            if(this.status != 'success'){
              this.status = 'error';
            }else{
              this.videos = response.data;
              console.log(this.videos);
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
    );
  }
}
