// src/app/pages/song/dmca/dmca-form/dmca-form.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { AuthService } from "./../../../../auth/auth.service";
import { Subscription } from "rxjs";
import { ApiService } from "./../../../../core/api.service";
import { DmcaModel } from "./../../../../core/models/dmca.model";
import { SongModel } from "../../../../core/models/song.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-dmca-form",
  templateUrl: "./dmca-form.component.html",
  styleUrls: ["./dmca-form.component.scss"]
})
export class DmcaFormComponent implements OnInit, OnDestroy {
  @Input() songId: string;
  @Input() songTitle: string;
  @Input() song: SongModel;
  @Input() dmca: DmcaModel;
  @Output() submitDmca = new EventEmitter();
  formDmca: DmcaModel;
  submitDmcaSub: Subscription;
  submitting: boolean;
  error: boolean;
  submitSongSub: Subscription;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this._setFormDmca();
  }

  private _setFormDmca() {
    // If creating a new Dmca,
    // create new DmcaModel with default data
    this.formDmca = new DmcaModel(
      this.auth.userProfile.name,
      this.songId,
      this.songTitle,
      null,
      null,
      null
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitDmcaSub = this.api.postDmca$(this.formDmca).subscribe(
      data => this._handleSubmitSuccess(data),
      err => this._handleSubmitError(err)
    );

    this.song.cViolation = true;

    //Edit the song so that cViolation is true
    this.submitSongSub = this.api.editSong$(this.songId, this.song).subscribe(
      data => this._handleSubmitSuccess(data),
      err => this._handleSubmitError(err)
    );
  }

  private _handleSubmitSuccess(res) {
    const songObj = {
      dmca: res
    };
    this.submitDmca.emit(songObj);
    this.error = false;
    this.submitting = false;
    console.log("Submitted DMCA");
    this.router.navigate(["/song/details", res._id]);
  }

  private _handleSubmitError(err) {
    const songObj = {
      error: err
    };
    this.submitDmca.emit(songObj);
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy() {
    if (this.submitDmcaSub) {
      this.submitDmcaSub.unsubscribe();
    }
  }
}
