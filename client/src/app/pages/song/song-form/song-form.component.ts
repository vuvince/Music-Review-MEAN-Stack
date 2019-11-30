// src/app/pages/admin/song-form/song-form.component.ts
// SOURCE https://auth0.com/blog/real-world-angular-series-part-6/
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ApiService } from "../../../core/api.service";
import { SongModel, FormSongModel } from "../../../core/models/song.model";
import { SongFormService } from "./song-form.service";
import { AuthService } from "./../../../auth/auth.service";

@Component({
  selector: "app-song-form",
  templateUrl: "./song-form.component.html",
  styleUrls: ["./song-form.component.scss"],
  providers: [SongFormService]
})
export class SongFormComponent implements OnInit, OnDestroy {
  @Input() song: SongModel;
  isEdit: boolean;
  // FormBuilder form
  songForm: FormGroup;
  datesGroup: AbstractControl;
  // Model storing initial form values
  formSong: FormSongModel;
  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;
  // Form submission
  submitSongObj: SongModel;
  submitSongSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public sf: SongFormService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formErrors = this.sf.formErrors;
    this.isEdit = !!this.song;
    this.submitBtnText = this.isEdit ? "Update Song" : "Create Song";
    // Set initial form data
    this.formSong = this._setFormSong();
    // Use FormBuilder to construct the form
    this._buildForm();
  }

  private _setFormSong() {
    if (!this.isEdit) {
      // If creating a new song, create new
      // FormSongModel with dsfault null data
      return new FormSongModel(null, null, null, null, null, null, null);
    } else {
      return new FormSongModel(
        this.song.title,
        this.song.artist,
        this.song.album,
        this.song.year,
        this.song.genre,
        this.song.cViolation
      );
    }
  }

  private _buildForm() {
    this.songForm = this.fb.group({
      title: [
        this.formSong.title,
        [
          Validators.required,
          Validators.minLength(this.sf.textMin),
          Validators.maxLength(this.sf.titleMax)
        ]
      ],
      artist: [
        this.formSong.artist,
        [Validators.required, Validators.minLength(this.sf.textMin)]
      ],
      album: [
        this.formSong.album,
        [Validators.required, Validators.minLength(this.sf.textMin)]
      ],
      year: [
        this.formSong.year,
        [Validators.required, Validators.minLength(this.sf.textMin)]
      ],
      genre: [
        this.formSong.genre,
        [Validators.required, Validators.minLength(this.sf.textMin)]
      ],
      cViolation: [this.formSong.cViolation, Validators.required]
    });

    // Subscribe to form value changes
    this.formChangeSub = this.songForm.valueChanges.subscribe(data =>
      this._onValueChanged()
    );

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.songForm) {
      return;
    }
    const _setErrMsgs = (
      control: AbstractControl,
      errorsObj: any,
      field: string
    ) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.sf.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + "<br>";
          }
        }
      }
    };

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        if (field !== "datesGroup") {
          // Set errors for fields not inside datesGroup
          // Clear previous error message (if any)
          this.formErrors[field] = "";
          _setErrMsgs(this.songForm.get(field), this.formErrors, field);
        }
      }
    }
  }

  private _getSubmitObj() {
    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new SongModel for submission
    return new SongModel(
      this.songForm.get("title").value,
      this.songForm.get("artist").value,
      this.songForm.get("album").value,
      this.songForm.get("year").value,
      this.songForm.get("genre").value,
      this.songForm.get("cViolation").value
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitSongObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitSongSub = this.api.postSong$(this.submitSongObj).subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      );
    }
    // FOR EDIDITING SONGS
    else {
      this.submitSongSub = this.api
        .editSong$(this.song._id, this.submitSongObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }

  //Does the route need to change?
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to song detail
    this.router.navigate(["/song/details", res._id]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.songForm.reset();
  }

  ngOnDestroy() {
    if (this.submitSongSub) {
      this.submitSongSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }
}
