import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { RentModel } from 'src/app/models/rent.model';
import { UserModel } from 'src/app/models/user.model';
import { store } from 'src/app/redux/store';
import { RentsService } from 'src/app/services/rents.service';

@Component({
  selector: 'app-prsonal-reserations',
  templateUrl: './prsonal-reservations.component.html',
  styleUrls: ['./prsonal-reservations.component.css']
})
export class PrsonalReservationsComponent implements OnInit {

  public user: UserModel = store.getState().user;
  public rents: RentModel[] = store.getState().rentsOfUser;
  public unsubscribe: Unsubscribe;

  constructor(private rentsService: RentsService) { }

  async ngOnInit() {
    this.unsubscribe = store.subscribe(()=>{
      this.user = store.getState().user;
      this.rents = store.getState().rentsOfUser;
    });
    if(store.getState().rentsOfUser.length===0){
      const success = await this.rentsService.getAllRentsOfUser(this.user.userId);
      if(success)
        this.rents = store.getState().rentsOfUser;
    }
  }

}
