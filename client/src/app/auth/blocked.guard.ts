// src/app/auth/admin.guard.ts
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class BlockedGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    //If not blocked, then its ok
    console.log(this.auth.isBlocked);
    if (!this.auth.isBlocked) {
      return true;
    }
    //Else, navigate to blocked page
    this.router.navigate(["/blocked"]);
    return false;
  }
}
