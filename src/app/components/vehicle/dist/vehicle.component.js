"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehicleComponent = void 0;
var core_1 = require("@angular/core");
var VehicleComponent = /** @class */ (function () {
    function VehicleComponent(_appService, cdr, _toster) {
        this._appService = _appService;
        this.cdr = cdr;
        this._toster = _toster;
        this.selectedVehicle = "";
        this.timeTaken = 0;
    }
    VehicleComponent.prototype.ngOnInit = function () {
        this.getVehicleList();
    };
    VehicleComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        setTimeout(function () {
            _this.resetSelectedVehicle();
        }, 100);
    };
    VehicleComponent.prototype.getVehicleList = function () {
        var _this = this;
        this._appService.vehicleServiceSubject.subscribe(function () {
            _this.vehicleList = _this._appService.getVehicleList();
        }, function (error) {
            console.log(error);
        });
    };
    VehicleComponent.prototype.updateSelectedVehicle = function (e) {
        if (this.selectedPlanet.name) {
            if (this.selectedVehicle) {
                this._appService.setSelectedVehicles(this.selectedVehicle, "delete");
                this._appService.setSelectedVehicles(e.target.value, "add");
                this.selectedVehicle = e.target.value;
            }
            else {
                this._appService.setSelectedVehicles(e.target.value, "add");
                this.selectedVehicle = e.target.value;
            }
            this.updateTimeTaken();
        }
        else {
            this._toster.error("Please select the planet first", "Vehicle Selection Error");
        }
    };
    VehicleComponent.prototype.resetSelectedVehicle = function () {
        if (this.selectedVehicle)
            this._appService.setSelectedVehicles(this.selectedVehicle, "delete");
        this.selectedVehicle = "";
        this.removeTimeTaken();
    };
    VehicleComponent.prototype.updateTimeTaken = function () {
        var _this = this;
        var sVehicle = this.vehicleList.find(function (x) { return x.name == _this.selectedVehicle; });
        if (sVehicle && sVehicle.name) {
            var timeTaken = this.selectedPlanet.distance / sVehicle.speed;
            if (this.timeTaken > 0) {
                //delete time take from the array in service
                this._appService.setTimeTaken(this.timeTaken, "delete");
                //add time taken for this planet
                this.timeTaken = timeTaken;
                this._appService.setTimeTaken(this.timeTaken, "add");
            }
            else {
                //add time taken for this planet
                this.timeTaken = timeTaken;
                this._appService.setTimeTaken(timeTaken, "add");
            }
        }
    };
    VehicleComponent.prototype.removeTimeTaken = function () {
        if (this.timeTaken > 0)
            this._appService.setTimeTaken(this.timeTaken, "delete");
    };
    __decorate([
        core_1.Input()
    ], VehicleComponent.prototype, "selectedPlanet");
    VehicleComponent = __decorate([
        core_1.Component({
            selector: 'app-vehicle',
            templateUrl: './vehicle.component.html',
            styleUrls: ['./vehicle.component.css']
        })
    ], VehicleComponent);
    return VehicleComponent;
}());
exports.VehicleComponent = VehicleComponent;
