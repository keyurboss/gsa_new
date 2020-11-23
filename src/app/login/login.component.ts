import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicFunctionsService } from '../services/basic-functions.service';
import { GlobalVariables } from '../services/variables';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  password = '';
  userId = '';
  waiting = false;
  constructor(
    private basic: BasicFunctionsService,
    private state: Router
  ) {}
  ngOnInit(): void {}
  login(): void {
    this.waiting = true;
    this.basic
      .login(this.userId, 'post', this.password)
      .then(() => {
        this.basic.clearhistoryGotoLink();
      })
      .catch(() => {
        GlobalVariables.swal.fire('Error', 'Something Went Wrong', 'error');
      })
      .finally(() => {
        this.waiting = false;
      });
  }
}
// [ladda]="progress"
