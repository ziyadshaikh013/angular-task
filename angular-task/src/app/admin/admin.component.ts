import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users: any;
  admin: any;

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.admin = JSON.parse(localStorage.getItem('currentUser'));
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
      console.log(res);
    });
  }

  onAssign(form: NgForm, id, email) {
    if (form.value.options) {
      let user = {
        sender: email,
        subject: form.value.options,
      };

      this.userService.sendRequest(id, user).subscribe(() => {
        console.log('request sent successfully');
        this.getAllUsers();
      });
    }else{
      console.log('error');
    }
  }
}
