//SOURCE https://auth0.com/blog/real-world-angular-series-part-2/

// src/app/auth/auth.service.ts
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AUTH_CONFIG } from "./auth.config";
import { ENV } from "./../core/env.config";
import * as auth0 from "auth0-js";

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: "token",
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  accessToken: string;
  userProfile: any;
  expiresAt: number;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  loggingIn: boolean;
  isAdmin: boolean;

  constructor(private router: Router) {
    // If app auth token is not expired, request new token
    if (JSON.parse(localStorage.getItem("expires_at")) > Date.now()) {
      this.renewToken();
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      //window.location.href is first paramater originally
      if (authResult && authResult.accessToken) {
        console.log("Handling Authentication");
        window.location.hash = "";
        this._getProfile(authResult);
      } else if (err) {
        this._clearRedirect();
        this.router.navigate(["/"]);
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    this.loggingIn = true;
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        console.log("Getting Profile");
        this._setSession(authResult, profile);
        this._redirect();
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  private _redirect() {
    // Redirect with or without 'tab' query parameter
    // Note: does not support additional params besides 'tab'
    const fullRedirect = decodeURI(localStorage.getItem("authRedirect"));
    const redirectArr = fullRedirect.split("?tab=");
    const navArr = [redirectArr[0] || "/"];
    const tabObj = redirectArr[1]
      ? { queryParams: { tab: redirectArr[1] } }
      : null;

    if (!tabObj) {
      // if (!this.loggedIn) {
      //   const navArr = ["/about"];
      //   this.router.navigate(navArr);
      // }
      //EDIT
      const navArr = ["/"];
      this.router.navigate(navArr);

      //ORIGINAL
      // this.router.navigate(navArr);
    } else {
      this.router.navigate(navArr, tabObj);
    }
    // Redirection completed; clear redirect from storage
    this._clearRedirect();
  }

  private _clearRedirect() {
    // Remove redirect from localStorage
    localStorage.removeItem("authRedirect");
  }

  private _setSession(authResult, profile?) {
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    // Store expiration in local storage to access in constructor
    localStorage.setItem("expires_at", JSON.stringify(this.expiresAt));
    this.accessToken = authResult.accessToken;
    if (profile) {
      this.userProfile = profile;
      this.isAdmin = this._checkAdmin(profile);
    }

    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);
    this.loggingIn = false;
  }

  //Check if admin
  private _checkAdmin(profile) {
    // Check if the user has admin role
    const roles = profile[AUTH_CONFIG.NAMESPACE] || [];
    return roles.indexOf("admin") > -1;
  }

  private _checkBanned(profile) {
    const roles = profile[AUTH_CONFIG.NAMESPACE] || [];
    return roles.indexOf("deactivated") > -1;
  }

  private _clearExpiration() {
    // Remove token expiration from localStorage
    localStorage.removeItem("expires_at");
  }

  logout() {
    // Remove data from localStorage
    this._clearExpiration();
    this._clearRedirect();
    // End Auth0 authentication session
    this._auth0.logout({
      clientId: AUTH_CONFIG.CLIENT_ID,
      returnTo: ENV.BASE_URI
    });
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    return Date.now() < JSON.parse(localStorage.getItem("expires_at"));
  }

  renewToken() {
    // Check for valid Auth0 session
    this._auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this._getProfile(authResult);
      } else {
        this._clearExpiration();
      }
    });
  }
}
