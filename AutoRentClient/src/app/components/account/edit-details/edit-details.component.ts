import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unsubscribe } from 'redux';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import { store } from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit, OnDestroy {

  public user: UserModel = store.getState().user;
  public preview: string;
  public unsubscribe: Unsubscribe;
  public localDialogRef;
  public credentials:CredentialsModel= new CredentialsModel();

  constructor(private usersService: UsersService, private dialog: MatDialog, private authService: AuthService) { }


  ngOnInit(): void {
    this.unsubscribe = store.subscribe(()=>this.user=store.getState().user);
    this.credentials.username = this.user.username;
    this.credentials.password = this.user.password;
  }




  public displayPreview(image: File): void {
    this.user.image = image;
    const fileReader = new FileReader();
    fileReader.onload = args => {
      this.preview = args.target.result.toString();
      console.log(this.preview);
    };
    fileReader.readAsDataURL(image);
  }

  async update(receiveTemlateRef, errorTemplateRef) {
    const success = await this.usersService.updateUser(this.user);
    this.openDialog(success?receiveTemlateRef:errorTemplateRef);
  }

  openDialog(templateRef) {
    this.localDialogRef = this.dialog.open(templateRef, {
      width: "fit-content",
      panelClass: 'custom-dialog-container',
    });
  }


  async onCloseDialog() {
    this.dialog.closeAll();
  }

  async clear(){
    await this.authService.login(this.credentials);
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
