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
import { PolicyModel } from "./models/policy.model";
import { DmcaModel } from "./models/dmca.model";

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

  //GET TOP 10 SONGS (BRING ['avg'] as well)
  getTopSongs$(): Observable<SongModel[]> {
    return this.http
      .get<SongModel[]>(`${ENV.BASE_API}open/song`)
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

  // GET an song by Id (LOGIN REQUIRED IN THIS EXAMPLE, BUT NOT IN FUTURE)
  getSongById$(id: string): Observable<SongModel> {
    return this.http
      .get<SongModel>(`${ENV.BASE_API}open/song/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET reviews by song Id (LOGIN REQUIRED IN THIS EXAMPLE, BUT NOT IN FUTURE)
  getRatingBySongId$(songId: string): Observable<any> {
    return this.http
      .get<any>(`${ENV.BASE_API}open/song/rating/${songId}`, {
        // [CHANGE]
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET reviews by song Id (LOGIN REQUIRED IN THIS EXAMPLE, BUT NOT IN FUTURE)
  getReviewsBySongId$(songId: string): Observable<ReviewModel[]> {
    return this.http
      .get<ReviewModel[]>(`${ENV.BASE_API}open/reviews/${songId}`, {
        // [CHANGE]
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // POST new Review (login required)
  postReview$(review: ReviewModel): Observable<ReviewModel> {
    return this.http
      .post<ReviewModel>(`${ENV.BASE_API}secure/review/new`, review, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // PUT existing Review (login required) (PATH NOT IMPLEMENTED IN BACKEND)
  editReview$(id: string, review: ReviewModel): Observable<ReviewModel> {
    return this.http
      .put(`${ENV.BASE_API}review/${id}`, review, {
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

  // POST new song (admin only)
  postSong$(song: SongModel): Observable<SongModel> {
    return this.http
      .post<SongModel>(`${ENV.BASE_API}secure/song/new`, song, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // PUT existing song (admin only)
  editSong$(id: string, song: SongModel): Observable<SongModel> {
    return this.http
      .put<SongModel>(`${ENV.BASE_API}admin/song/update/${id}`, song, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // DELETE existing song and all associated Reviews (admin only)
  deleteSong$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}admin/song/delete/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  //POLICY STUFF BELOW
  // GET list of all songs
  getPolicys$(): Observable<PolicyModel[]> {
    return this.http
      .get<PolicyModel[]>(`${ENV.BASE_API}open/policy`)
      .pipe(catchError(error => this._handleError(error)));
  }

  // POST new policy (admin only)
  editPolicy$(id: string, policy: PolicyModel): Observable<PolicyModel> {
    return this.http
      .put<PolicyModel>(`${ENV.BASE_API}admin/policy/update/${id}`, policy, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }
  // GET an song by Id (LOGIN REQUIRED IN THIS EXAMPLE, BUT NOT IN FUTURE)
  getPolicyById$(id: string): Observable<PolicyModel> {
    return this.http
      .get<PolicyModel>(`${ENV.BASE_API}open/policy/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // DELETE existing song and all associated Reviews (admin only)
  deletePolicy$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}admin/policy/delete/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  //DMCA STUFF BELOW
  // GET list of all songs
  getDmcas$(): Observable<DmcaModel[]> {
    return this.http
      .get<DmcaModel[]>(`${ENV.BASE_API}admin/dmca/all`)
      .pipe(catchError(error => this._handleError(error)));
  }

  // POST new Dmca (login required)
  postDmca$(dmca: DmcaModel): Observable<DmcaModel> {
    return this.http
      .post<DmcaModel>(`${ENV.BASE_API}admin/dmca/new`, dmca, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET dmcas by song Id (LOGIN REQUIRED IN THIS EXAMPLE, BUT NOT IN FUTURE)
  getDmcasBySongId$(songId: string): Observable<DmcaModel[]> {
    return this.http
      .get<DmcaModel[]>(`${ENV.BASE_API}admin/dmca/${songId}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // DELETE existing song and all associated Dmcas (admin only)
  deleteDmca$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}admin/dmca/delete/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }
}
