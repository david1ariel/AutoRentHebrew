import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { PrsonalReservationsComponent } from './prsonal-reservations/prsonal-reservations.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: AccountDashboardComponent, children: [
      { path: 'edit-details', component: EditDetailsComponent },
      { path: 'personal-reservations', component: PrsonalReservationsComponent },
  ] }
];


@NgModule({
  declarations: [
    AccountDashboardComponent,
    EditDetailsComponent,
    PrsonalReservationsComponent,

  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule
  ]
})
export class AccountModule { }
