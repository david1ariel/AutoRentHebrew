import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: UserModel;
  public preview: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = new UserModel();
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

  public async register() {
    const success = await this.authService.register(this.user);
    if(success) {
        this.router.navigateByUrl("/home");
    }
}
}
