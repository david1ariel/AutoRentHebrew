import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unsubscribe } from 'redux';
import { BranchModel } from 'src/app/models/branch.model';
import { UserModel } from 'src/app/models/user.model';
import { store } from 'src/app/redux/store';
import { BranchesService } from 'src/app/services/branches.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  public users = store.getState().users;
  public userToAdd = new UserModel();
  public unsubscribe: Unsubscribe;
  public localTemplateRef;
  public tempUsersImages = new Array<string>();
  public preview: string;
  public branches: BranchModel[] = [];


  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private branchesService: BranchesService) { }

  async ngOnInit() {
    this.unsubscribe = store.subscribe(() => {
      this.users = store.getState().users;
      this.branches = store.getState().branches;
    });
    if (store.getState().users.length === 0) {
      await this.usersService.getAllUsers();
      for (let e of this.users) {
        this.tempUsersImages.push(e.imageFileName);
      }
    }
    if(store.getState().branches.length===0){
      await this.branchesService.getAllBranches();
    }
  }

  public displayPreview(image: File, i: number): void {
    this.users[i].image = image;
    const fileReader = new FileReader();
    fileReader.onload = args => this.tempUsersImages[i] = args.target.result.toString();
    fileReader.readAsDataURL(image);
  }

  public displayNewUserPreview(image: File): void {
    this.userToAdd.image = image;
    const fileReader = new FileReader();
    fileReader.onload = args => this.preview = args.target.result.toString();
    fileReader.readAsDataURL(image);
  }

  changeForbidden() {
    alert('User ID can not be edited!');
  }

  async addUser(succeededTemplateRef, failedTemplateRef) {
    const sucess = await this.usersService.addUser(this.userToAdd);
    if (sucess) {
      this.openDialog(succeededTemplateRef);
    }
    else {
      this.openDialog(failedTemplateRef);
    }
  }

  async updateUser(e: UserModel, succeededTemplateRef, failedTemplateRef) {
    const sucess = await this.usersService.updateUser(e);
    if (sucess) {
      this.openDialog(succeededTemplateRef);
    }
    else {
      this.openDialog(failedTemplateRef);
    }
  }

  async deleteUser(e: UserModel) {
    await this.usersService.DeleteUser(e.userId);
  }

  clear() {
    this.userToAdd = new UserModel();
  }

  async clearChanges() {
    const success = await this.usersService.getAllUsers();
    if (success)

      for (let e of this.users) {
        this.tempUsersImages.push(e.imageFileName);
      }
  }

  openDialog(templateRef) {

    this.localTemplateRef = this.dialog.open(templateRef, {
      width: "fit-content",
      panelClass: 'custom-dialog-container',
    });
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }
}
