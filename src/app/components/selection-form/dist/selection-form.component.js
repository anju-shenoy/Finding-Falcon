"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.SelectionFormComponent = void 0;
var core_1 = require("@angular/core");
var SelectionFormComponent = /** @class */ (function () {
    function SelectionFormComponent(_appService) {
        this._appService = _appService;
        this.resetSelectedPlanet();
    }
    SelectionFormComponent.prototype.ngOnInit = function () {
        this.getPlanetList();
    };
    SelectionFormComponent.prototype.getPlanetList = function () {
        var _this = this;
        var self = this;
        this._appService.planetServiceSubject.subscribe(function () {
            _this.planetList = _this._appService.getPlanetList();
            if (_this.selectedPlanet.name)
                _this.planetList = __spreadArrays([_this.selectedPlanet], _this.planetList);
        });
    };
    SelectionFormComponent.prototype.updateSelectedPlanet = function (e) {
        if (e.target.value.length > 0) {
            if (this.selectedPlanet.name)
                this._appService.setSelectedPlanets(this.selectedPlanet.name, "delete");
            this.selectedPlanet = this.planetList.find(function (x) { return x.name == e.target.value; });
            this._appService.setSelectedPlanets(this.selectedPlanet.name, "add");
        }
        else {
            this._appService.setSelectedPlanets(this.selectedPlanet.name, "delete");
            this.resetSelectedPlanet();
        }
    };
    SelectionFormComponent.prototype.resetSelectedPlanet = function () {
        this.selectedPlanet = { name: "", distance: 0 };
    };
    SelectionFormComponent = __decorate([
        core_1.Component({
            selector: 'app-selection-form',
            templateUrl: './selection-form.component.html',
            styleUrls: ['./selection-form.component.css']
        })
    ], SelectionFormComponent);
    return SelectionFormComponent;
}());
exports.SelectionFormComponent = SelectionFormComponent;
