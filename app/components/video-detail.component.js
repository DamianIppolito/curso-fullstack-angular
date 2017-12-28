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
var video_service_1 = require('../services/video.service');
var VideoDetailComponent = (function () {
    function VideoDetailComponent(_userService, _videoService, _route, _router) {
        this._userService = _userService;
        this._videoService = _videoService;
        this._route = _route;
        this._router = _router;
    }
    VideoDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var id = +params["id"];
            _this._videoService.getVideo(id).subscribe(function (response) {
                _this.video = response.data;
                _this.status = response.status;
                if (_this.status != 'success') {
                    _this._router.navigate(['/index']);
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la petición2');
                }
            });
        });
    };
    VideoDetailComponent = __decorate([
        core_1.Component({
            selector: 'video-detail',
            templateUrl: 'app/view/video-detail.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [user_service_1.UserService, video_service_1.VideoService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, video_service_1.VideoService, router_1.ActivatedRoute, router_1.Router])
    ], VideoDetailComponent);
    return VideoDetailComponent;
}());
exports.VideoDetailComponent = VideoDetailComponent;
//# sourceMappingURL=video-detail.component.js.map