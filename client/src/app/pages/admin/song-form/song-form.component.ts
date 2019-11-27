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
import { ApiService } from "./../../../core/api.service";
import { SongModel, FormSongModel } from "./../../../core/models/song.model";
import { DatePipe } from "@angular/common";
import {
  DATE_REGEX,
  TIME_REGEX,
  stringsToDate
} from "./../../../core/forms/formUtils.factory";
import { SongFormService } from "./song-form.service";

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
    private datePipe: DatePipe,
    public ef: SongFormService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formErrors = this.ef.formErrors;
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
      // FormSongModel with default null data
      return new FormSongModel(null, null, null, null, null, null, null);
    }
  }

  private _buildForm() {
    this.songForm = this.fb.group({
      title: [
        this.formSong.title,
        [
          Validators.required,
          Validators.minLength(this.ef.textMin),
          Validators.maxLength(this.ef.titleMax)
        ]
      ],
      artist: [
        this.formSong.artist,
        [Validators.required, Validators.minLength(this.ef.textMin)]
      ],
      album: [
        this.formSong.album,
        [Validators.required, Validators.minLength(this.ef.textMin)]
      ],
      year: [
        this.formSong.year,
        [Validators.required, Validators.minLength(this.ef.textMin)]
      ],
      genre: [
        this.formSong.genre,
        [Validators.required, Validators.minLength(this.ef.textMin)]
      ],
      cViolation: [this.formSong.cViolation, Validators.required]
    });

    // Set local property to songForm datesGroup control
    this.datesGroup = this.songForm.get("datesGroup");

    // Subscribe to form value changes
    this.formChangeSub = this.songForm.valueChanges.subscribe(data =>
      this._onValueChanged()
    );

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an song that is no
    // longer valid (for example, an song in the past)
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.songForm);
      _markDirty(this.datesGroup);
    }

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
        const messages = this.ef.validationMessages[field];
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
        } else {
          // Set errors for fields inside datesGroup
          const datesGroupErrors = this.formErrors["datesGroup"];
          for (const dateField in datesGroupErrors) {
            if (datesGroupErrors.hasOwnProperty(dateField)) {
              // Clear previous error message (if any)
              datesGroupErrors[dateField] = "";
              _setErrMsgs(
                this.datesGroup.get(dateField),
                datesGroupErrors,
                dateField
              );
            }
          }
        }
      }
    }
  }

  private _getSubmitObj() {
    const startDate = this.datesGroup.get("startDate").value;
    const startTime = this.datesGroup.get("startTime").value;
    const endDate = this.datesGroup.get("endDate").value;
    const endTime = this.datesGroup.get("endTime").value;
    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new SongModel for submission
    return new SongModel(
      this.songForm.get("title").value,
      this.songForm.get("artist").value,
      this.songForm.get("viewPublic").value,
      this.songForm.get("description").value,
      this.song ? this.song._id : null
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
    //FOR EDIDITING SONGS
    // else {
    //   this.submitSongSub = this.api
    //     .editSong$(this.song._id, this.submitSongObj)
    //     .subscribe(
    //       data => this._handleSubmitSuccess(data),
    //       err => this._handleSubmitError(err)
    //     );
    // }
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to song detail
    this.router.navigate(["/song", res._id]);
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
