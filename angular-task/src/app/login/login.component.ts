import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    event.preventDefault();
    this.userService.login(form.value).subscribe((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res));
      if (form.value.role == 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }
    });
  }
}
