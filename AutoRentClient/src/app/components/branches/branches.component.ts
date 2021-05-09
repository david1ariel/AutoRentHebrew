import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Unsubscribe } from 'redux';
import { BranchModel } from 'src/app/models/branch.model';
import { store } from 'src/app/redux/store';
import { BranchesService } from 'src/app/services/branches.service';


/// <reference types="googlemaps" />


@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit, OnDestroy {

  public branches: BranchModel[] = store.getState().branches;
  public markers: google.maps.Marker[] = [];
  public unsubscribe: Unsubscribe;

  public latitude: number;
  public longitude: number;
  public mapZoom: number;
  public userLat: number;
  public userLng: number;
  public isOnInit = false;

  @ViewChild('map')
  mapElement: any;

  @ViewChild('branchesContainer')
  branchesContainerRef: ElementRef<HTMLDivElement>;


  public coordinates: google.maps.LatLng;
  public mapProperties: google.maps.MapOptions;
  // public map: google.maps.Map;

  constructor(private branchesService: BranchesService) { }



  async ngOnInit() {
    try {
      this.unsubscribe = store.subscribe(() => this.branches = store.getState().branches);
      if (store.getState().branches.length === 0) {
        await this.branchesService.getAllBranches().then(() => {
          this.latitude = this.branches[0]?.latitude;
          this.longitude = this.branches[0]?.longitude;
          this.mapZoom = 10;
        });
      }
      else {
        this.latitude = this.branches[0]?.latitude;
        this.longitude = this.branches[0]?.longitude;
        this.mapZoom = 10;
      }
      this.branchesContainerRef.nativeElement.style.maxWidth = window.screen.width.toString();
      console.log(this.branchesContainerRef);

    }
    catch (error) {
      console.log(error.message);
    }
    this.isOnInit = true;
  }

  showUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLat = position.coords.latitude;
        this.userLng = position.coords.longitude;
        this.latitude = this.userLat;
        this.longitude = this.userLng;
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      this.latitude = this.branches[0].latitude;
      this.longitude = this.branches[0].longitude;
    }
    this.latitude = this.branches[0].latitude;
    this.longitude = this.branches[0].longitude;
  }

  changeLocationOnMap(b: BranchModel) {
    this.latitude = b.latitude;
    this.longitude = b.longitude;
    this.mapZoom = 15;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
