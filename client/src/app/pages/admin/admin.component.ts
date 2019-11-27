// src/app/pages/admin/admin.component.ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./../../auth/auth.service";
import { ApiService } from "./../../core/api.service";
import { UtilsService } from "./../../core/utils.service";
import { FilterSortService } from "./../../core/filter-sort.service";
import { Subscription } from "rxjs";
import { SongModel } from "./../../core/models/song.model";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit, OnDestroy {
  pageTitle = "Admin";
  songsSub: Subscription;
  songList: SongModel[];
  filteredSongs: SongModel[];
  loading: boolean;
  error: boolean;
  query = "";

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getSongList();
  }

  private _getSongList() {
    this.loading = true;
    // Get all (admin) songs
    //GOING TO USE GET REG SONGS FOR TESTING PURPSOSES
    // this.songsSub = this.api.getAdminSongs$().subscribe(
    this.songsSub = this.api.getSongs$().subscribe(
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
    this.songsSub.unsubscribe();
  }
}
