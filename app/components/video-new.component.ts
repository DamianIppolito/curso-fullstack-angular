import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UploadService} from '../services/upload.service';
import {UserService} from '../services/user.service';
import {VideoService} from '../services/video.service';
import {User} from '../model/user';
import {Video} from '../model/video';

@Component({
    selector: 'video-new',
    templateUrl: 'app/view/video-new.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService, UploadService, VideoService]
})

export class VideoNewComponent implements OnInit{
  public titulo:string = "Crear un nuevo video";
  public video;
  public errorMessage: string;
  public status;

  constructor(
    private _userService: UserService,
    private _uploadService: UploadService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    this.video = new Video(1,"","","public","null","null",null,null);
  }

  callVideoStatus(value){
    this.video.status = value;
  }

  onSubmit(){
    let token = this._userService.getToken();
    this._videoService.create(token, this.video).subscribe(
      response => {
        this.status = response.status;
        console.log(response.status);
        console.log(response.data);
        if(this.status != 'success'){
          this.status = 'error';
        }else{
          this.video = response.data;
          console.log(this.video);
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
