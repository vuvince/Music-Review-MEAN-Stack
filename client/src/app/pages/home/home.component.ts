// import { Component, OnInit } from "@angular/core";
// import { Title } from "@angular/platform-browser";

// @Component({
//   selector: "app-home",
//   templateUrl: "./home.component.html",
//   styleUrls: ["./home.component.scss"]
// })
// export class HomeComponent implements OnInit {
//   pageTitle = "Home";

//   constructor(private title: Title) {}

//   ngOnInit() {
//     this.title.setTitle(this.pageTitle);
//   }
// }

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
  songList: SongModel[];
  filteredSongs: SongModel[];
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
  }

  private _getSongList() {
    this.loading = true;
    // Get future, public songs
    this.songListSub = this.api.getSongs$().subscribe(
      res => {
        this.songList = res;
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
    this.filteredSongs = this.fs.search(
      this.songList,
      this.query,
      "_id",
      "mediumDate"
    );
  }

  resetQuery() {
    this.query = "";
    this.filteredSongs = this.songList;
  }

  ngOnDestroy() {
    this.songListSub.unsubscribe();
  }
}
