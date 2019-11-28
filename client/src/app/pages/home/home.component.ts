//BELOW IS WHAT THE "SONGS PAGE SHOULD SHOW"
// src/app/pages/home/home.component.ts
// SOURCE: https://auth0.com/blog/real-world-angular-series-part-3/
// [NEED TO CHANGE]
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "./../../core/api.service";
import { UtilsService } from "./../../core/utils.service";
import { FilterSortService } from "./../../core/filter-sort.service";
import { Subscription } from "rxjs";
import { SongModel } from "./../../core/models/song.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle = "Songs";
  songListSub: Subscription;
  rankedSongsSub: Subscription;
  songList: SongModel[]; //FULL SONG LIST
  rankedSongs: SongModel[]; //TOP 10 SONGS
  filteredSongs: SongModel[]; //WHAT IS DISPLAYED TO USER
  loading: boolean;
  error: boolean;
  query: "";

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getSongList();
    this._getTopSongList();
  }

  private _getSongList() {
    this.loading = true;
    // Get future, public songs
    this.songListSub = this.api.getSongs$().subscribe(
      res => {
        this.songList = res; //The full song list, used for searching
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  private _getTopSongList() {
    this.loading = true;
    // Get future, TOP public songs
    this.rankedSongsSub = this.api.getTopSongs$().subscribe(
      res => {
        this.rankedSongs = res;
        this.filteredSongs = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  searchSongs() {
    this.filteredSongs = this.fs.search(this.songList, this.query, "_id");
  }

  resetQuery() {
    this.query = "";
    this.filteredSongs = this.rankedSongs;
  }

  ngOnDestroy() {
    this.songListSub.unsubscribe();
  }
}
