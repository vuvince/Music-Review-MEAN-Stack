// src/app/pages/home/home.component.ts
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
  pageTitle = "All Songs";
  songListSub: Subscription;
  songList: SongModel[];
  // filteredSongs: SongModel[];
  filteredSongs: any;
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
    // this.filteredSongs = this.fs.search(this.songList, this.query);
    var search = this.fs.search(this.songList, this.query);
    console.log(search);
    if (search.length > 1) {
      this.filteredSongs = search;
    }
  }

  resetQuery() {
    this.query = "";
    this.filteredSongs = this.songList;
  }

  ngOnDestroy() {
    this.songListSub.unsubscribe();
  }
}
