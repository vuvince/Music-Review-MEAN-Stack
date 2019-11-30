import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DmcaModel } from "./../../core/models/dmca.model";
import { AuthService } from "./../../auth/auth.service";
import { ApiService } from "./../../core/api.service";

@Component({
  selector: "app-dmca-log",
  templateUrl: "./dmca-log.component.html",
  styleUrls: ["./dmca-log.component.scss"]
})
export class DmcaLogComponent implements OnInit {
  dmcaListSub: Subscription;
  dmcaList: DmcaModel[];
  loading: boolean;
  error: boolean;

  constructor(public auth: AuthService, private api: ApiService) {}

  ngOnInit() {
    this._getDmcaList();
  }

  //Get the full policy list
  private _getDmcaList() {
    this.loading = true;
    // Get future, public policys
    this.dmcaListSub = this.api.getDmcas$().subscribe(
      res => {
        this.dmcaList = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }
}
