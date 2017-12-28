import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {VideoService} from '../services/video.service';
import {User} from '../model/user';
import {Video} from '../model/video';

@Component({
    selector: 'video-detail',
    templateUrl: 'app/view/video-detail.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService, VideoService]
})

export class VideoDetailComponent implements OnInit{

  public errorMessage;
  public video;
  public status;
  public loading;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.loading = 'show';
  }

  ngOnInit(){
    this._route.params.subscribe(params => {
      let id = +params["id"];
      this._videoService.getVideo(id).subscribe(
        response => {
          this.video = response.data;
          this.status = response.status;

          if(this.status != 'success'){
            this._router.navigate(['/index']);
          }
          this.loading = 'hide';
        },
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición2');
          }
        }
      );
    });
  }
}