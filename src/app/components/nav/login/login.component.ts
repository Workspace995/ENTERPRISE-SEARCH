import { Component, TemplateRef, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private modalService = inject(NgbModal);
  private router: Router = inject(Router);

  currentUser: any = null;

  validUsers = [
    {
      "userid": 1,
      "username": "Sreeni",
      "useremail": "sreeni@focalcxm.com",
      "password": "focal",
      "org_name": "Focal",
      "org_id": "1"
    },
    {
      "userid": 2,
      "username": "Mary",
      "useremail": "mary@focalcxm.com",
      "password": "focal",
      "org_name": "Focal",
      "org_id": "1"
    },
    {
      "userid": 3,
      "username": "Jayasree",
      "useremail": "jayasree@focalcxm.com",
      "password": "focal",
      "org_name": "Focal",
      "org_id": "1"
    },
    {
      "userid": 4,
      "username": "Jagadeesh",
      "useremail": "jagadeesh@focalcxm.com",
      "password": "focal",
      "org_name": "Focal",
      "org_id": "1"
    },
    {
      "userid": 5,
      "username": "Amaresh",
      "useremail": "amaresh@focalcxm.com",
      "password": "focal",
      "org_name": "Focal",
      "org_id": "1"
    },
    {
      "userid": 6,
      "username": "Jey",
      "useremail": "jey@focalcxm.com",
      "password": "focal",
      "org_name": "FocalCXM",
      "org_id": "2"
    },
    {
      "userid": 7,
      "username": "Manogna",
      "useremail": "manogna@focalcxm.com",
      "password": "focal",
      "org_name": "FocalCXM",
      "org_id": "2"
    },
    {
      "userid": 8,
      "username": "Adithya",
      "useremail": "adithya@focalcxm.com",
      "password": "focal",
      "org_name": "FocalCXM",
      "org_id": "2"
    },
    {
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
    const loginObj = this.loginForm.value;
    const user = this.validUsers.find(
      (user) => user.username === loginObj.username && user.password === loginObj.password
    );

    if (user) {
      // Store the current user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUser = user;
      this.modalService.dismissAll();
      this.successMessage = "Login successful.";
      this.errorMessage = "";
      window.location.reload(); // Refresh the page to reflect changes
    } else {
      this.errorMessage = "Invalid credentials";
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigateByUrl("login");
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => { },
      (reason) => { },
    );
  }

  ngOnInit() {
    const user = localStorage.getItem("user");
    if (user) {
      this.currentUser = JSON.parse(user);
    } else {
      this.router.navigateByUrl("login");
    }
  }
}
