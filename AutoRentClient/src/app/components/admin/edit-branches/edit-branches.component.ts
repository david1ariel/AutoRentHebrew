import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { BranchModel } from 'src/app/models/branch.model';
import { store } from 'src/app/redux/store';
import { BranchesService } from 'src/app/services/branches.service';

/// <reference types="googlemaps" />

@Component({
  selector: 'app-edit-branches',
  templateUrl: './edit-branches.component.html',
  styleUrls: ['./edit-branches.component.css']
})
export class EditBranchesComponent implements OnInit, OnDestroy {

  public branches = store.getState().branches;
  public unsubscribe: Unsubscribe;
  public branchToAdd: BranchModel = new BranchModel();
  public branchToAddMarker: google.maps.Marker;

  public latitude = 31.775466074016084;
  public longitude = 35.22217360892053;
  public mapZoom = 8;
  public geocoder: google.maps.Geocoder;
  public geocodeRequest: google.maps.GeocoderRequest;
  public location: google.maps.LatLng;

  constructor(private branchesService: BranchesService,
    private mapsApiLoader: MapsAPILoader,
    private http: HttpClient) { }


  async ngOnInit() {
    try {
      this.unsubscribe = store.subscribe(() => this.branches = store.getState().branches);
      if (store.getState().branches.length === 0) {
        await this.branchesService.getAllBranches().then(() => {
          this.latitude = this.branches[0].latitude;
          this.longitude = this.branches[0].longitude;
          this.mapZoom = 8;
        });
      }
      // else {
      //   this.latitude = this.branches[0].latitude;
      //   this.longitude = this.branches[0].longitude;
      //   this.mapZoom = 8;
      // }
      this.mapsApiLoader.load().then(() => {
        this.geocoder = new google.maps.Geocoder();
        this.branchToAddMarker = new google.maps.Marker();
        this.geocodeRequest = new Object();
        this.location = new google.maps.LatLng(1, 1);
      });
    }
    catch (error) {
      console.log(error.message);
    }




  }

  changeLocationOnMap(event, b) {
    this.latitude = b.latitude;
    this.longitude = b.longitude;
    this.mapZoom = 15;
    console.dir(event.latitude);
  }

  async AddBranch() {
    if (this.branchToAdd.name == "")
      alert("Branch Name Is Required!");
    if (this.branchToAdd.city == "")
      alert("Branch City Is Required!");
    if (this.branchToAdd.adressLine == "")
      alert("Branch Adress Line Is Required!");


    try {
      await this.branchesService.AddBranch(this.branchToAdd);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  async updateBranch(b: BranchModel) {
    try {

      await this.branchesService.updateBranch(b);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  async deleteBranch(b: BranchModel){
    try {
      await this.branchesService.deleteBranch(b.branchId);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  async markLocation(event) {
    this.branchToAdd.latitude = event.coords.lat;
    this.branchToAdd.longitude = event.coords.lng;
    console.log(this.branchToAdd.latitude);
    console.log(this.branchToAdd.longitude);
    this.location.lat = () => this.branchToAdd.latitude;
    this.location.lng = () => this.branchToAdd.longitude;
    this.geocodeRequest.location = this.location;
    await this.geocoder.geocode(this.geocodeRequest, (results, status) => {
      if (status === 'OK') {
        console.log(results);
        this.branchToAddMarker.setPosition(results[0].geometry.location);
        this.branchToAdd.city = results[0].address_components[2]?.long_name;
        this.branchToAdd.adressLine = results[0].address_components[1]?.long_name + ", " + results[0]?.address_components[0].long_name;
        for (let r of results) {
          for (let t of r.types) {
            if (t === "country") {
              this.branchToAdd.country = r.formatted_address;
              console.log("country: " + this.branchToAdd.country)
            }
          }
        }
      }
    });
  }

  public clear(){
    this.branchToAdd.adressLine="";
    this.branchToAdd.city="";
    this.branchToAdd.name="";
    this.branchToAdd.postalZipCode="";
    this.branchToAdd.country = "";
  }

  public async reset(b){
    await this.branchesService.getAllBranches();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
