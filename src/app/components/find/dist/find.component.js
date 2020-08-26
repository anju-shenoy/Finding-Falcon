"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FindComponent = void 0;
var core_1 = require("@angular/core");
var FindComponent = /** @class */ (function () {
    function FindComponent(_appService, router, _toastr) {
        this._appService = _appService;
        this.router = router;
        this._toastr = _toastr;
        this.totalTimeTaken = 0;
        this.isValidForSendingRequest = false;
        this.getTimeTaken();
    }
    FindComponent.prototype.ngOnInit = function () {
        this.getPlanets();
        this.getVehicles();
        this._appService.resetEverything();
    };
    FindComponent.prototype.getPlanets = function () {
        var _this = this;
        this._appService.getPlanets().subscribe(function (res) {
            _this._appService.setPlanetList(res);
        }, function (error) {
            console.log("Error occured while fetching the planets", error);
        });
    };
    FindComponent.prototype.getVehicles = function () {
        var _this = this;
        this._appService.getVehicles().subscribe(function (res) {
            _this._appService.setVehicleList(res);
        }, function (error) {
            console.log("Error occured while fetching the vehicles", error);
        });
    };
    FindComponent.prototype.getTimeTaken = function () {
        var _this = this;
        this._appService.timeTakenServiceSubject.subscribe(function (tt) {
            _this.totalTimeTaken = _this._appService.getTimeTaken().totalTime;
            if (_this._appService.getTimeTaken().length === 4)
                _this.isValidForSendingRequest = true;
            else
                _this.isValidForSendingRequest = false;
        });
    };
    FindComponent.prototype.findFalcone = function () {
        var _this = this;
        this._appService.findFlacone().subscribe(function (result) {
            _this._appService.setResult(result);
            _this.router.navigate(["result"]);
        }, function (error) {
            _this._toastr.error(error, "Find falcone api call failed");
        });
    };
    FindComponent = __decorate([
        core_1.Component({
            selector: 'app-find',
            templateUrl: './find.component.html',
            styleUrls: ['./find.component.css']
        })
    ], FindComponent);
    return FindComponent;
}());
exports.FindComponent = FindComponent;
