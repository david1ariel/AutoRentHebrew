import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public user = store.getState().user;
public unsubscribe: Unsubscribe;
  constructor() { }

  ngOnInit(): void {
this.unsubscribe = store.subscribe(()=>this.user = store.getState().user);
  }

}
