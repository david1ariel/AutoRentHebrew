import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { store } from 'src/app/redux/store';
import { HomeService } from 'src/app/services/home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    public home = store.getState().home;
    private unsubscribe: Unsubscribe;

    public constructor(private homeService: HomeService, private router: Router) { }

    public ngOnInit() {
        try {
            this.unsubscribe = store.subscribe(() => {
              this.home = store.getState().home;
              // if(window.innerWidth<=576){
              //   this.router.navigateByUrl("/cars")
              // }

            });
            if (!store.getState().home.backgroundImage) {
                this.homeService.getHomeData();
            }
        }
        catch(error)
        {
            console.log(error.message);
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribe();
    }
}
