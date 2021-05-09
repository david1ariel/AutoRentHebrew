import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public home = store.getState().home;
  private unsubscribe: Unsubscribe;
  public windowWidth = window.innerWidth;

  constructor(private cdRef: ChangeDetectorRef) { }

  async ngOnInit() {
    this.unsubscribe = store.subscribe(() => {
      this.home = store.getState().home;
      this.cdRef.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
