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
var user_1 = require('../model/user');
var RegisterComponent = (function () {
    function RegisterComponent(_userService, _route, _router) {
        this._userService = _userService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Registro";
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.user = new user_1.User(1, "user", "", "", "", "", "null");
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.user);
        this._userService.register(this.user).subscribe(function (response) {
            _this.status = response.status;
            if (_this.status != 'success') {
                _this.status = 'error';
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: 'app/view/register.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.ActivatedRoute, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map