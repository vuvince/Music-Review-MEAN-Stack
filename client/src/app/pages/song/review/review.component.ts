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
  recent: ReviewModel;
  totalReviews: number;
  totalRating: number;
  totalReview: number;
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
    this._averageRating();
    this.toggleEditForm(false);
  }

  //WHEN CICKING SUBMIT
  onSubmitReview(e) {
    if (e.review) {
      console.log("Submitting Review");
      this.userReview = e.review;
      this._updateReviewState(true);
      this.toggleEditForm(false);
      this.recent = this.userReview;
    }
  }

  //CAUSES LOADING IF NOT LOGGED IN
  private _updateReviewState(changed?: boolean) {
    // if (!_initialUserReview && this.userReview && changed) {
    if (this.userReview && changed) {
      this.reviews.push(this.userReview);
    }

    //Update average rating
    this._averageRating();
    this._setReviewCount(changed);
  }

  //GET THE AVERAGE RATING FOR THE SONG
  private _averageRating() {
    this.totalRating = 0;
    for (let i = 0; i < this.reviews.length; i++) {
      this.totalRating += this.reviews[i].rating;
    }
    this.averageRating = this.totalRating / this.reviews.length;
    this.totalReview = this.reviews.length;
  }

  private _getReviews() {
    this.loading = true;
    // Get Reviews by song Id
    console.log("_getReview: songID is");
    console.log(this.songId);
    this.reviewsSub = this.api.getReviewsBySongId$(this.songId).subscribe(
      res => {
        this.reviews = res;
        this.recent = this.reviews[this.reviews.length - 1];
        this._updateReviewState(); //NEED TO COMMENT OUT IF NOT LOGGED IN OR ADD LOGGED IN LOGIC
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

  private _setReviewCount(changed?: boolean) {
    if (changed) {
      let ratingCount = 0;
      const reviewArr = this.reviews.map(review => {
        // If user has an existing RSVP
        if (review.userId === this.auth.userProfile.sub) {
          if (changed) {
            review = this.userReview;
          } else {
            // If no changes were made, set userReview property
            this.userReview = review;
          }
        }
        // Count total number of attendees

        ratingCount++;
        if (review.rating) {
          this.totalRating += review.rating;
        }

        return review;
      });
    }
  }

  ngOnDestroy() {
    this.reviewsSub.unsubscribe();
  }
}
