import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {Video} from '../model/video';

@Component({
    selector: 'comments',
    templateUrl: 'app/view/comments.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService]
})

export class CommentsComponent implements OnInit{
  public titulo: string = "Comentarios";
  public comment;
  public identity;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe(
      params => {
        let id = +params["id"];
        this.comment = {
          "video_id" : id,
          "body" : ""
        };
      }
    );
  }

  onSubmit(){
    console.log(this.comment);
  }
}
