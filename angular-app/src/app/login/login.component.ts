import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public username: FormControl = new FormControl();
  public password: FormControl = new FormControl();

  public failedLogin: boolean = false;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      "username": this.username,
      "password": this.password
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.userService.loginUser(this.username.value, this.password.value);
    setTimeout(() => {
      if (this.userService.getCurrentUser() == null) {
        this.password.reset();
        this.failedLogin = true;
      } else {
        this.router.navigate(['/profile']);
      }
    }, 2000);
  }

}
