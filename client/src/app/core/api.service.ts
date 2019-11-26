// src/app/core/api.service.ts
//SOURCE: https://auth0.com/blog/real-world-angular-series-part-3/
//[TO CHANGE]

import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "./../auth/auth.service";
import { throwError as ObservableThrowError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ENV } from "./env.config";
import { SongModel } from "./models/song.model";
import { ReviewModel } from "./models/review.model";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }

  // GET list of all songs
  getSongs$(): Observable<SongModel[]> {
    return this.http
      .get<SongModel[]>(`${ENV.BASE_API}open/song/available`)
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET all songs - private and public (admin only)
  getAdminSongs$(): Observable<SongModel[]> {
    return this.http
      .get<SongModel[]>(`${ENV.BASE_API}admin/song/all`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET an song by ID (login required) (ROUTE NOT CREATED)
  getSongById$(id: string): Observable<SongModel> {
    return this.http
      .get<SongModel>(`${ENV.BASE_API}song/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET reviews by song ID (login required)
  getReviewsBySongId$(songId: string): Observable<ReviewModel[]> {
    return this.http
      .get<ReviewModel[]>(`${ENV.BASE_API}open/reviews/${songId}`, {
        // [CHANGE]
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || "Error: Unable to complete request.";
    if (err.message && err.message.indexOf("No JWT present") > -1) {
      this.auth.login();
    }
    return ObservableThrowError(errorMsg);
  }
}
