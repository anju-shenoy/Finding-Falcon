"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppService = void 0;
var environment_1 = require("./../../environments/environment");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var AppService = /** @class */ (function () {
    function AppService(http) {
        this.http = http;
        this.selectedPlanets = [];
        this.selectedVehicles = [];
        this.timeTaken = [];
        this.result = {};
        this.planetServiceSubject = new rxjs_1.Subject();
        this.selectedPlanetChanged = this.planetServiceSubject.asObservable();
        this.vehicleServiceSubject = new rxjs_1.Subject();
        this.selectedVehicleChanged = this.vehicleServiceSubject.asObservable();
        this.timeTakenServiceSubject = new rxjs_1.Subject();
        this.timeTakenChanged = this.timeTakenServiceSubject.asObservable();
        this.planetList = [];
        this.vehicleList = [];
        this.headers = new http_1.HttpHeaders().append("Accept", "application/json").append("Content-Type", "application/json");
    }
    AppService.prototype.getPlanets = function () {
        return this.http.get(environment_1.environment.planetUrl);
    };
    AppService.prototype.getVehicles = function () {
        return this.http.get(environment_1.environment.vehicleUrl);
    };
    AppService.prototype.setPlanetList = function (pList) {
        this.planetList = pList;
        localStorage.setItem("plist", JSON.stringify(pList));
        this.planetServiceSubject.next();
    };
    AppService.prototype.getPlanetList = function () {
        console.log("get planetList");
        var self = this;
        return this.planetList.filter(function (item) {
            return self.selectedPlanets.indexOf(item.name) == -1;
        });
    };
    AppService.prototype.setVehicleList = function (vList) {
        this.vehicleList = vList;
        localStorage.setItem("vlist", JSON.stringify(vList));
        this.vehicleServiceSubject.next();
    };
    AppService.prototype.getVehicleList = function () {
        var _this = this;
        var remainingVList = JSON.parse(localStorage.getItem("vlist"));
        var _loop_1 = function (i) {
            var index = remainingVList.findIndex(function (x) { return x.name === _this.selectedVehicles[i]; });
            remainingVList[index].total_no = remainingVList[index].total_no - 1;
        };
        for (var i = 0; i < this.selectedVehicles.length; i++) {
            _loop_1(i);
        }
        return remainingVList;
    };
    AppService.prototype.setSelectedPlanets = function (item, action) {
        if (action == "add") {
            if (item && this.selectedPlanets.indexOf(item) == -1) {
                this.selectedPlanets.push(item);
            }
        }
        else if (action == "delete") {
            var index = this.selectedPlanets.findIndex(function (x) { return x == item; });
            if (index > -1)
                this.selectedPlanets.splice(index, 1);
        }
        this.planetServiceSubject.next();
        this.vehicleServiceSubject.next();
    };
    AppService.prototype.setSelectedVehicles = function (item, action) {
        if (action == "add") {
            this.selectedVehicles.push(item);
        }
        else if (action == "delete") {
            var index = this.selectedVehicles.findIndex(function (x) { return x == item; });
            if (index > -1)
                this.selectedVehicles.splice(index, 1);
        }
        this.vehicleServiceSubject.next();
    };
    AppService.prototype.setTimeTaken = function (time, action) {
        if (action == "add") {
            this.timeTaken.push(time);
        }
        else if (action == "delete") {
            var index = this.timeTaken.findIndex(function (x) { return x == time; });
            if (index > -1)
                this.timeTaken.splice(index, 1);
        }
        this.timeTakenServiceSubject.next();
    };
    AppService.prototype.getTimeTaken = function () {
        return { "totalTime": this.timeTaken.length > 0 ? this.timeTaken.reduce(function (a, b) { return a + b; }) : 0, "length": this.timeTaken.length };
    };
    AppService.prototype.findFlacone = function () {
        var _this = this;
        return this.http.post(environment_1.environment.tokenUrl, null, { headers: this.headers }).pipe(operators_1.mergeMap(function (token) { return _this.find(token); }));
    };
    AppService.prototype.find = function (token) {
        var body = {
            "token": token.token,
            "planet_names": this.selectedPlanets,
            "vehicle_names": this.selectedVehicles
        };
        return this.http.post(environment_1.environment.findUrl, body, { headers: this.headers });
    };
    AppService.prototype.resetEverything = function () {
        this.selectedPlanets = [];
        this.selectedVehicles = [];
        this.timeTaken = [];
        this.result = {};
        this.planetServiceSubject.next();
        this.vehicleServiceSubject.next();
        this.timeTakenServiceSubject.next();
        return "done";
    };
    AppService.prototype.setResult = function (res) {
        this.result = res;
        this.result["timeTaken"] = this.timeTaken.reduce(function (a, b) { return a + b; });
    };
    AppService.prototype.getResult = function () {
        return this.result;
    };
    AppService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
