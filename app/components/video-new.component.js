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
var upload_service_1 = require('../services/upload.service');
var user_service_1 = require('../services/user.service');
var VideoNewComponent = (function () {
    function VideoNewComponent(_userService, _uploadService, _route, _router) {
        this._userService = _userService;
        this._uploadService = _uploadService;
        this._route = _route;
        this._router = _router;
    }
    VideoNewComponent.prototype.ngOnInit = function () {
        console.log("Componente video new cargado");
    };
    VideoNewComponent = __decorate([
        core_1.Component({
            selector: 'video-new',
            templateUrl: 'app/view/video-new.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [user_service_1.UserService, upload_service_1.UploadService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, upload_service_1.UploadService, router_1.ActivatedRoute, router_1.Router])
    ], VideoNewComponent);
    return VideoNewComponent;
}());
exports.VideoNewComponent = VideoNewComponent;
//# sourceMappingURL=video-new.component.js.map