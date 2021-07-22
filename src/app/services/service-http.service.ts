import { Injectable } from '@angular/core';
import { Config } from '../config/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ServiceHttp {

    api_url: string;

    constructor(private _http: HttpClient, private router: Router) { }

    getResponse(url: String, method: String, data = null): any {
        this.api_url = Config.API_URL + url;
        if (method == 'GET') {
            return this._http.get(this.api_url, this.getHeaders()).pipe(map(data =>
                this.extractData(data)));
        } else if (method == 'POST') {
            return this._http.post(this.api_url, data, this.getHeaders()).pipe(
                catchError((err) => {
                    return throwError(err);
                })
            );
        }
    }
    getTemplate(url: String, method: String, id = null): any {
        this.api_url = Config.API_URL + url + id;
        if (method == 'GET') {
            return this._http.get(this.api_url, this.getHeaders()).pipe(map(data =>
                this.extractData(data)));
        }
        if (method == 'DEL') {
            return this._http.delete(this.api_url, this.getHeaders()).pipe(
                catchError((err) => {
                    return throwError(err);
                })
            );
        }
    }
    update(url: String, method: String, id = null, data): any {
        this.api_url = Config.API_URL + url + id;
        return this._http.put(this.api_url, data, this.getHeaders()).pipe(
            catchError((err) => {
                return throwError(err);
            })
        );

    }
    private extractData(body: any): any {
        return body;
    }

    private getHeaders() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error.error.message);
        } else {
            console.error('Backend error occured:', error.error.error);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }

}