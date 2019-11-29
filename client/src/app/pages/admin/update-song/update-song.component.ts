//SOURCE https://auth0.com/blog/real-world-angular-series-part-6/
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./../../../auth/auth.service";
import { ApiService } from "./../../../core/api.service";
import { UtilsService } from "./../../../core/utils.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { SongModel } from "./../../../core/models/song.model";

@Component({
  selector: "app-update-song",
  templateUrl: "./update-song.component.html",
  styleUrls: ["./update-song.component.scss"]
})
export class UpdateSongComponent implements OnInit, OnDestroy {
  pageTitle = "Update Song";
  routeSub: Subscription;
  songSub: Subscription;
  song: SongModel;
  loading: boolean;
  error: boolean;
  private _id: string;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    // Set song ID from route params and subscribe
    this.routeSub = this.route.params.subscribe(params => {
      this._id = params["id"];
      this._getSong();
    });
  }

  private _getSong() {
    this.loading = true;
    // GET song by ID
    this.songSub = this.api.getSongById$(this._id).subscribe(
      res => {
        this.song = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.songSub.unsubscribe();
  }
}
