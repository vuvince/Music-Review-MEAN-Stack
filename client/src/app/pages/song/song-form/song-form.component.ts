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
import { ReviewModel } from "src/app/core/models/review.model";

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
  submitReviewObj: ReviewModel;
  submitReviewSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;
  showReview: boolean;
  showReviewText: string;
  rError: boolean;
  sSuccess: boolean;

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
    this.showReview = false;
    this.submitBtnText = this.isEdit ? "Update Song" : "Create Song";
    this.showReviewText = this.showReview ? "Hide Reviews" : "Add Reviews";
    // Set initial form data
    this.formSong = this._setFormSong();
    // Use FormBuilder to construct the form
    this._buildForm();
  }

  private _setFormSong() {
    if (!this.isEdit) {
      // If creating a new song, create new
      // FormSongModel with default null data
      return new FormSongModel(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
    } else {
      return new FormSongModel(
        this.song.title,
        this.song.artist,
        this.song.album,
        this.song.year,
        this.song.genre,
        this.song.cViolation,
        null
      );
    }
  }

  toggleShowReviews() {
    this.showReview = !this.showReview;
    this.showReviewText = this.showReview ? "Hide Reviews" : "Add Reviews";
  }

  //Validators
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
      album: [this.formSong.album, [Validators.minLength(this.sf.textMin)]],
      year: [
        this.formSong.year,
        [
          Validators.minLength(this.sf.textMin),
          Validators.maxLength(this.sf.yearMax)
        ]
      ],
      genre: [this.formSong.genre, [Validators.minLength(this.sf.textMin)]],
      cViolation: [this.formSong.cViolation],
      rating: [this.formSong.rating, [Validators.min(1), Validators.max(5)]],
      reviewComments: [
        this.formSong.reviewComments,
        Validators.minLength(this.sf.textMin)
      ]
    });

    // Subscribe to form value changes
    this.formChangeSub = this.songForm.valueChanges.subscribe(data =>
      this._onValueChanged()
    );

    // this._onValueChanged();
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
    return new SongModel(
      this.songForm.get("title").value,
      this.songForm.get("artist").value,
      this.songForm.get("album").value,
      this.songForm.get("year").value,
      this.songForm.get("genre").value,
      this.songForm.get("cViolation").value,
      0 //avg rating
    );
  }

  //IF A REVIEW IS ADDED
  private _getReviewObj(id) {
    console.log(id);
    console.log(this.songForm.get("reviewComments").value);
    return new ReviewModel(
      id, //Song id
      this.auth.userProfile.sub, //User id
      this.auth.userProfile.name, //User Name
      this.songForm.get("reviewComments").value,
      null,
      this.songForm.get("rating").value
    );
  }

  //WHEN CLCIKING SUBMIT
  onSubmit() {
    this.submitting = true;
    this.submitSongObj = this._getSubmitObj();

    if (!this.isEdit) {
      //If adding a review conccurently
      if (this.showReview) {
        this.submitSongSub = this.api.postSong$(this.submitSongObj).subscribe(
          data => this.submitReview(data),
          err => this._handleSubmitError(err)
        );
      } else {
        this.submitSongSub = this.api.postSong$(this.submitSongObj).subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
      }
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
    this.rError = false;
    this.submitting = false;
    // Redirect to song detail
    if (this.showReview) {
      this.router.navigate(["/song/details", res.songId]);
    } else {
      this.router.navigate(["/song/details", res._id]);
    }
  }

  submitReview(res) {
    this.sSuccess = true;
    this.submitReviewObj = this._getReviewObj(res._id);
    this.submitReviewSub = this.api.postReview$(this.submitReviewObj).subscribe(
      data => this._handleSubmitSuccess(data),
      err => this._handleReviewError(err)
    );
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  private _handleReviewError(err) {
    console.log(err);
    this.submitting = false;
    this.rError = true;
  }

  resetForm() {
    this.songForm.reset();
  }

  ngOnDestroy() {
    if (this.submitSongSub) {
      this.submitSongSub.unsubscribe();
    }
    if (this.submitReviewSub) {
      this.submitReviewSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }
}
