import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {CommentService} from '../services/comment.service';
import {generateDate} from '../pipes/generate-date.pipe';
import {User} from '../model/user';
import {Video} from '../model/video';

@Component({
    selector: 'comments',
    templateUrl: 'app/view/comments.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService, CommentService],
    pipes : [generateDate]
})

export class CommentsComponent implements OnInit{
  public titulo: string = "Comentarios";
  public comment;
  public identity;
  public errorMessage;
  public status;
  public commentList;
  public commentStatus;
  public loading;

  constructor(
    private _userService: UserService,
    private _commentService : CommentService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.loading = 'show';
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe(
      params => {
        let id = +params["id"];
        this.comment = {
          "video_id" : id,
          "body" : ""
        };
        //Conseguir comentarios
        this.getComments(id);
      }
    );
  }

  onSubmit(){
    console.log(this.comment);
    let token = this._userService.getToken();
    this._commentService.create(token, this.comment).subscribe(
      response => {
        this.status = response.status;
        if(this.status != 'success'){
          this.status = 'error';
        }else{
          this.comment.body = "";
          //Recargar comentarios
          this.getComments(this.comment.video_id);
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

  getComments(video_id){
    this.loading = 'show';
    this._commentService.getCommentsOfVideo(video_id).subscribe(
      response => {
        this.commentStatus = response.status;
        if(this.commentStatus != 'success'){
          this.commentStatus = 'error';
        }else{
          this.commentList = response.data;
          this.loading = 'hide';
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
