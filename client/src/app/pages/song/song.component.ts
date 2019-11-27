// src/app/pages/song/song.component.ts
// source: https://auth0.com/blog/real-world-angular-series-part-4/
// [TO CHANGE]
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./../../auth/auth.service";
import { ApiService } from "./../../core/api.service";
import { UtilsService } from "./../../core/utils.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { SongModel } from "./../../core/models/song.model";

@Component({
  selector: "app-song",
  templateUrl: "./song.component.html",
  styleUrls: ["./song.component.scss"]
})
export class SongComponent implements OnInit, OnDestroy {
  pageTitle: string;
  id: string;
  loggedInSub: Subscription;
  routeSub: Subscription;
  tabSub: Subscription;
  songSub: Subscription;
  song: SongModel;
  loading: boolean;
  error: boolean;
  tab: string;
  songPast: boolean;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    private title: Title
  ) {}

  //IS USER LOGGED IN?
  ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe(loggedIn => {
      this.loading = true;
      this._routeSubs();
      //BELOW IS JUST TO AUTHENTICATE LOGIN
      // if (loggedIn) {
      //   this._routeSubs();
      // }
    });
  }

  private _routeSubs() {
    // Set song Id from route params and subscribe
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this._getSong();
    });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams.subscribe(queryParams => {
      this.tab = queryParams["tab"] || "details";
    });
  }

  private _getSong() {
    this.loading = true;
    // GET song by Id
    this.songSub = this.api.getSongById$(this.id).subscribe(
      res => {
        this.song = res;
        this._setPageTitle(this.song.title);
        this.loading = false;
        // this.songPast = this.utils.songPast(this.song.endDatetime);
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
        this._setPageTitle("Song Details");
      }
    );
  }

  private _setPageTitle(title: string) {
    this.pageTitle = title;
    this.title.setTitle(title);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.tabSub.unsubscribe();
    this.songSub.unsubscribe();
  }
}
