import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { NgForm } from '@angular/forms';
import { FilesService } from '../service/files.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: any;
  files: any;
  isRequest: Boolean = false;
  isAccepted: Boolean = false;

  constructor(
    private userService: UserServiceService,
    private fileService: FilesService
  ) {}

  ngOnInit(): void {
    this.fileService.getfiles().subscribe((res) => {
      this.files = res;
      console.log(this.files);
    });

    this.users = JSON.parse(localStorage.getItem('currentUser'));
    if (this.users.user.isRequest) {
      this.isRequest = true;
    }
    if (this.users.user.request.isAccepted) {
      this.isAccepted = true;
    }
  }

  onAccept() {
    this.userService.acceptRequest(this.users.user._id).subscribe(() => {
      this.isAccepted = true;
    });
  }  


  onSubmit(form: NgForm) {
    alert('Not implemented yet!!!')
  }

}
