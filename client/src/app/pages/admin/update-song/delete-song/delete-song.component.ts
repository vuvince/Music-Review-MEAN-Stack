//SOURCE https://auth0.com/blog/real-world-angular-series-part-7/
import { Component, OnDestroy, Input } from "@angular/core";
import { SongModel } from "./../../../../core/models/song.model";
import { Subscription } from "rxjs";
import { ApiService } from "./../../../../core/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-delete-song",
  templateUrl: "./delete-song.component.html",
  styleUrls: ["./delete-song.component.scss"]
})
export class DeleteSongComponent implements OnDestroy {
  @Input() song: SongModel;
  confirmDelete: string;
  deleteSub: Subscription;
  submitting: boolean;
  error: boolean;

  constructor(private api: ApiService, private router: Router) {}

  removeSong() {
    this.submitting = true;
    // DELETE song by ID
    this.deleteSub = this.api.deleteSong$(this.song._id).subscribe(
      res => {
        this.submitting = false;
        this.error = false;
        console.log(res.message);
        // If successfully deleted song, redirect to Admin
        this.router.navigate(["/admin"]);
      },
      err => {
        console.error(err);
        this.submitting = false;
        this.error = true;
      }
    );
  }

  ngOnDestroy() {
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
