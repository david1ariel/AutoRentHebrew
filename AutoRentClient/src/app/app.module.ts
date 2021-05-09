import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from "./components/header/header.Component";
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ReturnCarComponent } from './components/employees/return-car/return-car.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RentComponent } from './components/rent/rent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BranchesComponent } from './components/branches/branches.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { EditHomeComponent } from './components/admin/edit-home/edit-home.component';
import { FormsModule } from '@angular/forms';
import { CarsComponent } from './components/cars/cars.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AvailabilitiesComponent } from './components/availabilities/availabilities.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ReturnCarComponent,
    RegisterComponent,
    RentComponent,


    BranchesComponent,
    CustomerServiceComponent,
    AboutComponent,
    DashboardComponent,
    EditHomeComponent,
    CarsComponent,
    AvailabilitiesComponent,
    DummyComponent,
    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSliderModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBipKMPPpcUPALUdBAmZ25cKLSj2BBoZA8'
    }),
    AgmJsMarkerClustererModule,
    HttpClientModule,
    FormsModule,



  ],
  providers: [
    HttpClientModule,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }

  ],

  bootstrap: [LayoutComponent]
})
export class AppModule { }
