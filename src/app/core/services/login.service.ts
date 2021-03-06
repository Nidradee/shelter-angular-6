import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { UserDetailsService } from '@appCore/services/user-details.service';

@Injectable()
export class LoginService {
  private baseUrl: string = 'http://alphard.us/v1/api';

  constructor(private http: HttpClient, private userDetails: UserDetailsService) { }

  login(username: string, password: string) {
    const loginUrl: string = `${this.baseUrl}/login`;
    let params = new HttpParams();
    params = params.append('username', username);
    params = params.append('password', password);
    return this.http.get(loginUrl, { params });
  }

  signup(signupData: object) {
    console.log(signupData)
    const signupUrl: string = `${this.baseUrl}/signup`;
    return this.http.post(signupUrl, { signupData });
  }

  isLoggedIn() {
    let loggedInStatus: boolean = false;
    if (this.userDetails.accessToken) {
      loggedInStatus = true;
    }
    console.log('logged IN', loggedInStatus);
    return loggedInStatus;
  }
}
