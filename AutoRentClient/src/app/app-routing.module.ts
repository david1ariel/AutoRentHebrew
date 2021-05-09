import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ReturnCarComponent } from './components/employees/return-car/return-car.component';
import { AboutComponent } from './components/about/about.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { BranchesComponent } from './components/branches/branches.component';
import { RentComponent } from './components/rent/rent.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { LoginGuardService } from './services/login-guard.service';
import { ReturnCarGuardService } from './services/return-car-guard.service';
import { DummyComponent } from './components/dummy/dummy.component';
import { AccountDashboardComponent } from './components/account/account-dashboard/account-dashboard.component';
import { EditDetailsComponent } from './components/account/edit-details/edit-details.component';
import { PrsonalReservationsComponent } from './components/account/prsonal-reservations/prsonal-reservations.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "rent", component: RentComponent},
    {path: "branches", component: BranchesComponent},
    {path: "cars", component: CarsComponent},
    {path: "customer-service", component: CustomerServiceComponent},
    {path: "about", component: AboutComponent},
    {path: "employees/return-car", component: ReturnCarComponent},
    {path: "admin", loadChildren: () => import("./components/admin/admin.module").then(m=>m.AdminModule) },
    {path: "auth/register", component: RegisterComponent},
    {path: "auth/login", component: LoginComponent},
    {path: "account", loadChildren: () => import("./components/account/account.module").then(m=>m.AccountModule)},
    {path: "return-car", canActivate:[ReturnCarGuardService],  component: ReturnCarComponent},
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
