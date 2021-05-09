import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.css']
})
export class CustomerServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  send(){
    alert("Sorry, but this section is yet in development...")
  }
}
