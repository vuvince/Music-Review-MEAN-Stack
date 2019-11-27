// src/app/pages/song/review/review-form/review-form.component.ts
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
import { ReviewModel } from "./../../../../core/models/review.model";
import { GUESTS_REGEX } from "./../../../../core/forms/formUtils.factory";

@Component({
  selector: "app-review-form",
  templateUrl: "./review-form.component.html",
  styleUrls: ["./review-form.component.scss"]
})
export class ReviewFormComponent implements OnInit, OnDestroy {
  @Input() songId: string;
  @Input() review: ReviewModel;
  @Output() submitReview = new EventEmitter();
  GUESTS_REGEX = GUESTS_REGEX;
  isEdit: boolean;
  formReview: ReviewModel;
  submitReviewSub: Subscription;
  submitting: boolean;
  error: boolean;

  constructor(private auth: AuthService, private api: ApiService) {}

  ngOnInit() {
    this.isEdit = !!this.review;
    this._setFormReview();
  }

  private _setFormReview() {
    if (!this.isEdit) {
      // If creating a new Review,
      // create new ReviewModel with default data
      this.formReview = new ReviewModel(
        this.songId,
        this.auth.userProfile.sub,
        this.auth.userProfile.name,
        null,
        null,
        null
      );
    } else {
      // If editing an existing Review,
      // create new ReviewModel from existing data
      this.formReview = new ReviewModel(
        this.review.songId,
        this.review.userId,
        this.review.name,
        this.review.comments,
        this.review.reviewDate,
        this.review.rating
      );
    }
  }

  //EDIT
  changeAttendanceSetGuests() {
    // If attendance changed to no, set rating: 0
    // if (!this.formReview.attending) {
    //   this.formReview.rating = 0;
    // }
  }

  onSubmit() {
    this.submitting = true;
    if (!this.isEdit) {
      this.submitReviewSub = this.api.postReview$(this.formReview).subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      );
    }
    //EDITING FORM
    // else {
    //   this.submitReviewSub = this.api
    //     .editReview$(this.review._id, this.formReview)
    //     .subscribe(
    //       data => this._handleSubmitSuccess(data),
    //       err => this._handleSubmitError(err)
    //     );
    // }
  }

  private _handleSubmitSuccess(res) {
    const songObj = {
      isEdit: this.isEdit,
      review: res
    };
    this.submitReview.emit(songObj);
    this.error = false;
    this.submitting = false;
  }

  private _handleSubmitError(err) {
    const songObj = {
      isEdit: this.isEdit,
      error: err
    };
    this.submitReview.emit(songObj);
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy() {
    if (this.submitReviewSub) {
      this.submitReviewSub.unsubscribe();
    }
  }
}
