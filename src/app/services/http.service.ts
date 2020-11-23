import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Variables } from './variables';
import { rejects } from 'assert';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl;
  private baseUrl;
  private loginUrl;
  constructor(
    variabbles: Variables,
    private httpclient: HttpClient,
    private state: Router
  ) {
    this.baseUrl = variabbles.getBaseUrl();
    this.apiUrl = variabbles.getApiUrl();
    this.loginUrl = variabbles.getLoginUrl();
  }
  private http(url, type: 'get' | 'post', paramss = {}) {
    if (type === 'get') {
      return this.httpclient.get<any>(url, {
        params: paramss,
      });
    } else {
      return this.httpclient.post(url, paramss);
    }
  }
  getApiHttp(url: string, type: 'get' | 'post', params = {}): Promise<any> {
    return this.http(this.apiUrl + url, type, params)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        if (err.status === 403 || err.status === 401) {
          return this.refreshToken().then(() => {
            return this.getApiHttp(url, type, params);
          });
        } else {
          throw err;
        }
      });
  }
  getHttp(url: string, type: 'get' | 'post', params = {}): Promise<any> {
    return this.http(this.baseUrl + url, type, params).toPromise();
  }
  getLoginHttp(url: string, type: 'get' | 'post', params = {}): Promise<any> {
    return this.http(this.loginUrl + url, type, params).toPromise();
  }
  refreshToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      const a = localStorage.getItem('refreshToken');
      if (a && a !== null && typeof a !== 'undefined') {
        this.getLoginHttp('/refreshaceesstoken', 'get', { token: a })
          .then((data: any) => {
            if (data.success && data.success === 1 && data.data.accessToken) {
              localStorage.setItem('accessToken', data.data.accessToken);
              delete data.data.accessToken;
              localStorage.setItem('user', JSON.stringify(data.data));
              resolve();
            } else {
              this.state.navigateByUrl('login', { replaceUrl: true });
              reject();
            }
          })
          .catch(() => {
            //// GOTO LOgin Page
            this.state.navigateByUrl('login', { replaceUrl: true });
            reject();
          });
      } else {
        reject();
      }
    });
  }
}
