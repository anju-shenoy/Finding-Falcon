import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FindComponent } from './components/find/find.component';
import { ToastrModule } from 'ngx-toastr';
import { ResultComponent } from './components/result/result.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { SelectionFormComponent } from './components/selection-form/selection-form.component';
import { AuthguardService } from './services/authguard.service';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    FindComponent,
    ResultComponent,
    VehicleComponent,
    SelectionFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot()

  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
