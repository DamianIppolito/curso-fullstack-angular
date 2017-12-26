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
var login_service_1 = require('../services/login.service');
var router_1 = require('@angular/router');
var LoginComponent = (function () {
    function LoginComponent(_loginService, _route, _router) {
        this._loginService = _loginService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Formulario de login";
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var logout = +params["id"];
            if (logout == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                _this.identity = null;
                _this.token = null;
                window.location.href = "/login";
            }
        });
        this.user = {
            "email": "",
            "password": "",
            "getHash": "false"
        };
        this.identity = this._loginService.getIdentity();
        this.token = this._loginService.getToken();
        if (this.identity != null && this.identity.sub) {
            this._router.navigate(["/index"]);
        }
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.user.getHash = 'false';
        this._loginService.signUp(this.user).subscribe(function (response) {
            var identity = response;
            _this.identity = identity;
            if (identity.length <= 1) {
                alert("Error en el servidor");
            }
            else {
                if (!identity.status) {
                    localStorage.setItem('identity', JSON.stringify(identity));
                    _this.user.getHash = 'true';
                    _this._loginService.signUp(_this.user).subscribe(function (response) {
                        var token = response;
                        _this.token = token;
                        if (token.length <= 0) {
                            alert("Error en el servidor");
                        }
                        else {
                            if (!token.status) {
                                localStorage.setItem('token', token);
                                window.location.href = "/";
                            }
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage != null) {
                            console.log(_this.errorMessage);
                            alert('Error en la petición');
                        }
                    });
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la petición');
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/view/login.html',
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.ActivatedRoute, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map