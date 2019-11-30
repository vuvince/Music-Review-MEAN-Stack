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
import { GUESTS_REGEX } from "./../../../../core/forms/formUtils.factory";

@Component({
  selector: "app-dmca-form",
  templateUrl: "./dmca-form.component.html",
  styleUrls: ["./dmca-form.component.scss"]
})
export class DmcaFormComponent implements OnInit, OnDestroy {
  @Input() songId: string;
  @Input() songTitle: string;
  @Input() dmca: DmcaModel;
  @Output() submitDmca = new EventEmitter();
  GUESTS_REGEX = GUESTS_REGEX;
  formDmca: DmcaModel;
  submitDmcaSub: Subscription;
  submitting: boolean;
  error: boolean;

  constructor(private auth: AuthService, private api: ApiService) {}

  ngOnInit() {
    this._setFormDmca();
  }

  private _setFormDmca() {
    // If creating a new Dmca,
    // create new DmcaModel with default data
    this.formDmca = new DmcaModel(
      this.auth.userProfile.email,
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
  }

  private _handleSubmitSuccess(res) {
    const songObj = {
      dmca: res
    };
    this.submitDmca.emit(songObj);
    this.error = false;
    this.submitting = false;
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
