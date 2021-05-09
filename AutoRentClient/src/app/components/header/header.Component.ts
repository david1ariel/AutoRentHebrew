import { Unsubscribe } from 'redux';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { store } from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ActionType } from 'src/app/redux/action-type';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  public unsubscribe: Unsubscribe;
  public scrolled = false;
  public isScrolled = false;
  public user = store.getState().user;
  public greetings = this.getGreetings();
  public windowWidth = window.innerWidth;
  public isShowMenu = false;

  constructor(private authService: AuthService, private router: Router, private cdRef:ChangeDetectorRef) { }

  @ViewChild("menuImage")
  menuImageRef: ElementRef<HTMLImageElement>;

  @ViewChild("headline")
  headline: ElementRef<HTMLImageElement>;

  @ViewChild('h1')
  h1Ref: ElementRef<HTMLParagraphElement>;

  @ViewChild('h2')
  h2Ref: ElementRef<HTMLParagraphElement>;

  public ngOnInit(): void {
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().user;
      this.greetings = this.getGreetings();
      this.isShowMenu = store.getState().isShowMenu;
      // this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 576) {
        this.h1Ref.nativeElement.style.fontSize = "40px";
        this.h2Ref.nativeElement.style.fontSize = "11px";
        this.h1Ref.nativeElement.style.padding = "0";
        this.h2Ref.nativeElement.style.padding = "0";
        this.headline.nativeElement.style.paddingLeft = "40px";
      }
    });
    console.log(this.windowWidth);
  }

  ngAfterViewInit(): void {
    this.windowWidth = window.innerWidth;
    this.cdRef.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowWidth = window.innerWidth;
    console.log(this.windowWidth);

    if (this.windowWidth <= 576) {
      this.h1Ref.nativeElement.style.fontSize = "40px";
      this.h2Ref.nativeElement.style.fontSize = "13px";
      this.h1Ref.nativeElement.style.padding = "0";
      this.h2Ref.nativeElement.style.padding = "0";
      this.headline.nativeElement.style.paddingLeft = "40px";
    }
    if (this.windowWidth > 576) {
      this.h1Ref.nativeElement.style.fontSize = "50px";
      this.h2Ref.nativeElement.style.fontSize = "18px";
      this.h1Ref.nativeElement.style.padding = "0";
      this.h2Ref.nativeElement.style.paddingLeft = "50px";
      this.headline.nativeElement.style.paddingLeft = "80px";
    }
  }

  toggleMenu() {
    if (this.isShowMenu != store.getState().isShowMenu)
      this.isShowMenu = store.getState().isShowMenu;
    this.isShowMenu = !this.isShowMenu;
    store.dispatch({ type: ActionType.ToggleMenu, payload: this.isShowMenu })
  }

  @HostListener('document:click', ['$event'])
  handleMenuByClick(e: MouseEvent) {
    if (e.target != this.menuImageRef?.nativeElement) {
      this.isShowMenu = false;
      store.dispatch({ type: ActionType.ToggleMenu, payload: this.isShowMenu });
    }

  }

  private getGreetings(): string {
    return "Hello " + (this.user ? this.user.firstName : "Guest");
  }


  refresh() {
    this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/rent');
    });
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl("/home");
  }

  toggleHebrew() {
    alert("For now, the hebrew version is in dvelopment yet. \nPlease try later.");
  }



  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
