// src/app/pages/song/review/review.component.ts
// SOURCE: https://auth0.com/blog/real-world-angular-series-part-5/
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { AuthService } from "./../../../auth/auth.service";
import { ApiService } from "./../../../core/api.service";
import { UtilsService } from "./../../../core/utils.service";
import { FilterSortService } from "./../../../core/filter-sort.service";
import { ReviewModel } from "./../../../core/models/review.model";
import { Subscription } from "rxjs";
import { expandCollapse } from "./../../../core/expand-collapse.animation";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"],
  animations: [expandCollapse]
})
export class ReviewComponent implements OnInit, OnDestroy {
  @Input() songId: string;
  reviewsSub: Subscription;
  reviews: ReviewModel[]; //Array of all reviews for this specific song
  loading: boolean;
  error: boolean;
  userReview: ReviewModel;
  totalReviews: number;
  totalRating: number;
  averageRating: number;
  showAllReviews = true;
  showReviewsText = "View All Reviews";
  showEditForm = false; //FOR EDITING REVIEW
  editBtnText = "Edit My Review";

  constructor(
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService
  ) {}

  ngOnInit() {
    this._getReviews();
    this.toggleEditForm(false);
  }

  onSubmitReview(e) {
    if (e.review) {
      console.log("Submitting Review");
      this.userReview = e.review;
      // this._updateReviewState(true);
      this.toggleEditForm(false);
    }
  }

  private _updateReviewState(changed?: boolean) {
    // If Review matching user ID is already
    // in Review array, set as initial Review
    const _initialUserReview = this.reviews.filter(review => {
      return review.userId === this.auth.userProfile.sub;
    })[0];

    // If user has not Reviewed before and has made
    // a change, push new Review to local Reviews store
    if (!_initialUserReview && this.userReview && changed) {
      this.reviews.push(this.userReview);
    }

    //Set the
    this._setUserReviewGetAttending(changed);
  }

  private _getReviews() {
    this.loading = true;
    // Get Reviews by song Id
    console.log("_getReview: songID is");
    console.log(this.songId);
    this.reviewsSub = this.api.getReviewsBySongId$(this.songId).subscribe(
      res => {
        this.reviews = res;
        // this._updateReviewState();
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  toggleShowReviews() {
    this.showAllReviews = !this.showAllReviews;
    this.showReviewsText = this.showAllReviews
      ? "Hide Reviews"
      : "Show All Reviews";
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? "Cancel Edit" : "Edit My Review";
  }

  private _setUserReviewGetAttending(changed?: boolean) {
    // Iterate over RSVPs to get/set user's RSVP
    // and get total number of attending rating
    let rating = 0;
    const reviewArr = this.reviews.map(review => {
      // If user has an existing RSVP
      if (review.userId === this.auth.userProfile.sub) {
        if (changed) {
          // If user edited their RSVP, set with updated data
          review = this.userReview;
        } else {
          // If no changes were made, set userReview property
          // (This applies on ngOnInit)
          this.userReview = review;
        }
      }
      // Count total number of attendees
      // + additional rating

      rating++;
      if (review.rating) {
        rating += review.rating;
      }

      return review;
    });
    console.log(reviewArr);
    this.reviews = reviewArr;
    this.totalRating = rating;
  }

  ngOnDestroy() {
    this.reviewsSub.unsubscribe();
  }
}
