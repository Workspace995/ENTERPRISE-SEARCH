import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  currentUser: any = null;
  private router: Router = inject(Router)

  validUsers = [
    {
      "userid": 1,
      "username": "Sreeni",
      "useremail": "sreeni@focalcxm.com",
      "password": "focal",
      "org_name": "Focal",
      "org_id": "1"
    },{
      "userid": 2,
      "username": "Mary",
      "useremail": "mary@focalcxm.com",
      "password": "focal",
      "org_name": "Focal",
      "org_id": "1"
    },{
      "userid": 3,
      "username": "Jayasree",
      "useremail": "jayasree@focalcxm.com",
      "password": "focal",
      "org_name": "Focal",
      "org_id": "1"
    },{
      "userid": 4,
      "username": "Jagadeesh",
      "useremail": "jagadeesh@focalcxm.com",
      "password": "focal",
      "org_name": "Focal",
      "org_id": "1"
    },{
      "userid": 5,
      "username": "Amaresh",
      "useremail": "amaresh@focalcxm.com",
      "password": "focal",
      "org_name": "Focal",
      "org_id": "1"
    },{
      "userid": 6,
      "username": "Jey",
      "useremail": "jey@focalcxm.com",
      "password": "focal",
      "org_name": "FocalCXM",
      "org_id": "2"
    },{
      "userid": 7,
      "username": "Manogna",
      "useremail": "manogna@focalcxm.com",
      "password": "focal",
      "org_name": "FocalCXM",
      "org_id": "2"
    },{
      "userid": 8,
      "username": "Adithya",
      "useremail": "adithya@focalcxm.com",
      "password": "focal",
      "org_name": "FocalCXM",
      "org_id": "2"
    },{
      "userid": 9,
      "username": "TestUser",
      "useremail": "testuser@focalcxm.com",
      "password": "focal",
      "org_name": "FocalCXM",
      "org_id": "2"
    }
  ];
  errorMessage: string = "";
  successMessage: string = "";
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  login() {
    let loginObj = this.loginForm.value;
    for (let index = 0; index < this.validUsers.length; index++) {
      const element = this.validUsers[index];
      if(element.username == loginObj.username && element.password == loginObj.password) {
        localStorage.setItem('user', JSON.stringify(element));
        this.successMessage = "Login successful."
        this.errorMessage = "";
        this.router.navigateByUrl("");
        break;
      } else {
        this.errorMessage = "Invalid credentials";
      }
    }
  }

  ngOnInit() {
    let user = localStorage.getItem("user");
    if(user) {
      this.currentUser = JSON.parse(user);
    }
  }
}
