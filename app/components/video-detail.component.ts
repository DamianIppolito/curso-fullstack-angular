import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {VideoService} from '../services/video.service';
import {generateDate} from '../pipes/generate-date.pipe';
import {CommentsComponent} from './comments.component';
import {User} from '../model/user';
import {Video} from '../model/video';

@Component({
    selector: 'video-detail',
    templateUrl: 'app/view/video-detail.html',
    directives: [ROUTER_DIRECTIVES, CommentsComponent],
    providers: [UserService, VideoService],
    pipes : [generateDate]
})

export class VideoDetailComponent implements OnInit{

  public errorMessage;
  public video;
  public status;
  public loading;
  public latestVideos;
  public statusLatestVideos;
  public identity;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.loading = 'show';
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe(params => {
      this.loading = 'show';
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

      this._videoService.getLatestVideos().subscribe(
        response => {
          this.latestVideos = response.data;
          this.statusLatestVideos = response.status;

          if(this.statusLatestVideos != 'success'){
            this._router.navigate(['/index']);
          }
        },
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición3');
          }
        }
      );
    });
  }
}
