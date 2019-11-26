// src/app/pages/song/song-detail/song-detail.component.ts
import { Component, Input } from "@angular/core";
import { AuthService } from "./../../../auth/auth.service";
import { UtilsService } from "./../../../core/utils.service";
import { SongModel } from "./../../../core/models/song.model";

@Component({
  selector: "app-song-detail",
  templateUrl: "./song-detail.component.html",
  styleUrls: ["./song-detail.component.scss"]
})
export class SongDetailComponent {
  @Input() song: SongModel;

  constructor(public utils: UtilsService, public auth: AuthService) {}
}
