import { HomeService } from './../../../services/home.service';
import { Unsubscribe } from 'redux';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { store } from 'src/app/redux/store';
import { HomeModel } from 'src/app/models/home.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-home',
    templateUrl: './edit-home.component.html',
    styleUrls: ['./edit-home.component.css']
})
export class EditHomeComponent implements OnInit, OnDestroy {

    constructor(private homeService: HomeService, private router: Router) { }

    home: HomeModel = store.getState().home;
    unsubscribe: Unsubscribe;
    preview: string;

    async ngOnInit() {
        try {
          this.unsubscribe = store.subscribe(() => this.home = store.getState().home);

            if (!store.getState().home) {
                await this.homeService.getHomeData();
            }
            this.preview = this.home.backgroundImageFileName
        }
        catch (error) {
            console.log(error.message);
        }
    }

    async UpdateHomeObject(){
        try{
            await this.homeService.UpdateHomeData(this.home);
            this.router.navigateByUrl('/home');
        }
        catch(error){
            console.log(error.message);
        }
    }

    public displayPreview(image: File):void{
        this.home.backgroundImage = image;
        const fileReader = new FileReader();
        fileReader.onload = args=>this.preview = args.target.result.toString();
        fileReader.readAsDataURL(image);
    }


    public ngOnDestroy(): void {
        this.unsubscribe();
    }

}
