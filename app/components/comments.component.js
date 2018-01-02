"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var user_service_1 = require('../services/user.service');
var comment_service_1 = require('../services/comment.service');
var generate_date_pipe_1 = require('../pipes/generate-date.pipe');
var CommentsComponent = (function () {
    function CommentsComponent(_userService, _commentService, _route, _router) {
        this._userService = _userService;
        this._commentService = _commentService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Comentarios";
        this.loading = 'show';
    }
    CommentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.identity = this._userService.getIdentity();
        this._route.params.subscribe(function (params) {
            var id = +params["id"];
            _this.comment = {
                "video_id": id,
                "body": ""
            };
            //Conseguir comentarios
            _this.getComments(id);
        });
    };
    CommentsComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.comment);
        var token = this._userService.getToken();
        this._commentService.create(token, this.comment).subscribe(function (response) {
            _this.status = response.status;
            if (_this.status != 'success') {
                _this.status = 'error';
            }
            else {
                _this.comment.body = "";
                //Recargar comentarios
                _this.getComments(_this.comment.video_id);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    CommentsComponent.prototype.getComments = function (video_id) {
        var _this = this;
        this.loading = 'show';
        this._commentService.getCommentsOfVideo(video_id).subscribe(function (response) {
            _this.commentStatus = response.status;
            if (_this.commentStatus != 'success') {
                _this.commentStatus = 'error';
            }
            else {
                _this.commentList = response.data;
                _this.loading = 'hide';
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    CommentsComponent = __decorate([
        core_1.Component({
            selector: 'comments',
            templateUrl: 'app/view/comments.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [user_service_1.UserService, comment_service_1.CommentService],
            pipes: [generate_date_pipe_1.generateDate]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, comment_service_1.CommentService, router_1.ActivatedRoute, router_1.Router])
    ], CommentsComponent);
    return CommentsComponent;
}());
exports.CommentsComponent = CommentsComponent;
//# sourceMappingURL=comments.component.js.map