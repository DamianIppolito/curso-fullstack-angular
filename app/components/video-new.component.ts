import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UploadService} from '../services/upload.service';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {Video} from '../model/video';

@Component({
    selector: 'video-new',
    templateUrl: 'app/view/video-new.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService, UploadService]
})

export class VideoNewComponent implements OnInit{
  constructor(
    private _userService: UserService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    console.log("Componente video new cargado")
  }
}
