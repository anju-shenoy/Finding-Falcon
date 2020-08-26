import { Component, OnInit } from '@angular/core';
import { planet } from 'src/app/models/planet.model';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-selection-form',
  templateUrl: './selection-form.component.html',
  styleUrls: ['./selection-form.component.css']
})
export class SelectionFormComponent implements OnInit {
  selectedPlanet: planet;
  planetList: planet[];


  constructor(private _appService: AppService) {
      this.resetSelectedPlanet();
  }

  ngOnInit() {
      this.getPlanetList();
  }

  getPlanetList() {
      let self = this;

      this._appService.planetServiceSubject.subscribe(() => {
          this.planetList = this._appService.getPlanetList();
          if (this.selectedPlanet.name)
              this.planetList = [this.selectedPlanet, ...this.planetList];
      });
  }

  updateSelectedPlanet(e: any) {

      if (e.target.value.length > 0) {

          if (this.selectedPlanet.name)
              this._appService.setSelectedPlanets(this.selectedPlanet.name, "delete");

          this.selectedPlanet = this.planetList.find(x=>x.name == e.target.value);
          this._appService.setSelectedPlanets(this.selectedPlanet.name, "add");
      }
      else {
          this._appService.setSelectedPlanets(this.selectedPlanet.name, "delete");
          this.resetSelectedPlanet();
      }
  }

  resetSelectedPlanet() {
      this.selectedPlanet = { name: "", distance: 0 };
  }


}
