import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from '@appCore/services/login.service';
import { UserDetailsService } from '@appCore/services/user-details.service';

@Component({
  selector: 'sa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private userDetails: UserDetailsService
  ) { }

  ngOnInit() {
    this.createLoginForm();
    this.setLoginCredentials();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitForm(form) {
    this.loginService.login(form.value.username, form.value.password)
      .subscribe((loginResponse) => {
        this.userDetails.accessToken = loginResponse['access_token'];
        this.userDetails.username = loginResponse['username'];
        this.router.navigate(['/backend/dashboard']);
      },
      (error) => {
        console.error('Error signing up:', error)
      });
  }

  private setLoginCredentials() {
    this.activatedRoute.queryParamMap
      .subscribe((values) => {
        let creds = values['params'];
        if (creds['username'] && creds['password']) {
          this.loginForm.setValue({ username: creds['username'], password: creds['password'] });
        }
      })
  }

}
