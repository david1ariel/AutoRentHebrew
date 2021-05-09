import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public credentials: CredentialsModel = new CredentialsModel();
  public preview: string;

  constructor(private authService: AuthService, private router: Router) { }

  public async login() {
    const success = await this.authService.login(this.credentials);
    if(success) {
        this.router.navigateByUrl("/home");
    }
}

}
