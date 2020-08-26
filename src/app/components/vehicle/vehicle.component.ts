import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { planet } from 'src/app/models/planet.model';
import { vehicle } from 'src/app/models/vehicle.model';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/services/app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {


  @Input() public selectedPlanet: planet;
  vehicleList: vehicle[];
  selectedVehicle: string = "";
  timeTaken: number = 0;


  constructor(private _appService: AppService,
    private cdr: ChangeDetectorRef,
    private _toster : ToastrService) {

  }

  ngOnInit() {
      this.getVehicleList();
  }

  ngOnChanges(changes: SimpleChanges): void {
      setTimeout(() => {
          this.resetSelectedVehicle();
      }, 100);

  }

  getVehicleList() {
      this._appService.vehicleServiceSubject.subscribe(() => {
          this.vehicleList = this._appService.getVehicleList();
      }, error => {
          console.log(error);
      });
  }

  updateSelectedVehicle(e: any) {

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
      else{
        this._toster.error("Please select the planet first","Vehicle Selection Error");
    }

  }

  resetSelectedVehicle() {
      if (this.selectedVehicle)
          this._appService.setSelectedVehicles(this.selectedVehicle, "delete");

      this.selectedVehicle = "";

      this.removeTimeTaken();
  }

  updateTimeTaken() {

      let sVehicle = this.vehicleList.find(x => x.name == this.selectedVehicle);
      if (sVehicle && sVehicle.name) {
          let timeTaken = this.selectedPlanet.distance / sVehicle.speed;

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
  }

  removeTimeTaken() {
      if (this.timeTaken > 0)
          this._appService.setTimeTaken(this.timeTaken, "delete");
  }
}
