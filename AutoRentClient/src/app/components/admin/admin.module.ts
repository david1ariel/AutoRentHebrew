import { FormsModule } from '@angular/forms';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarTypesComponent } from './car-types/car-types.component';
import { EditBranchesComponent } from './edit-branches/edit-branches.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { AvailabilitiesComponent } from '../availabilities/availabilities.component';
import {PipeModule} from '../../pipe/pipe.module'

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: 'edit-home', component: EditHomeComponent },
        { path: 'edit-branches', component: EditBranchesComponent },
        { path: 'car-types', component: CarTypesComponent },
        { path: 'edit-availabilities/:carTypeId', component: AvailabilitiesComponent },
        { path: 'edit-availabilities', component: AvailabilitiesComponent },
        { path: 'edit-users', component: EditUsersComponent },
    ] }
];

@NgModule({
  declarations: [
    CarTypesComponent,
    EditBranchesComponent,
    EditUsersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBipKMPPpcUPALUdBAmZ25cKLSj2BBoZA8'
    }),
    AgmJsMarkerClustererModule,
    PipeModule
  ]
})
export class AdminModule { }
