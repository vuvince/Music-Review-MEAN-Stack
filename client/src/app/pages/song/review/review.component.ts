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
  @Input() songPast: boolean;
  reviewsSub: Subscription;
  reviews: ReviewModel[];
  loading: boolean;
  error: boolean;
  userReview: ReviewModel;
  totalAttending: number;
  showAllReviews = false;
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
  }

  private _getReviews() {
    this.loading = true;
    // Get Reviews by song Id
    this.reviewsSub = this.api.getReviewsBySongId$(this.songId).subscribe(
      res => {
        this.reviews = res;
        this._updateReviewState();
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

  private _updateReviewState() {
    // @TODO: We will add more functionality here later
    this._setUserReviewGetAttending();
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? "Cancel Edit" : "Edit My Review";
  }

  onSubmitReview(e) {
    if (e.review) {
      this.userReview = e.review;
      // @TODO: update _updateReviewState() method
      // to support 'changed' parameter:
      // this._updateReviewState(true);
      this.toggleEditForm(false);
    }
  }

  //ALTER THIS TO GET THE AVERAGE SONG RATING
  private _setUserReviewGetAttending() {
    // // Iterate over Reviews to get/set user's Review
    // // and get total number of attending guests
    // let guests = 0;
    // const reviewArr = this.reviews.map(review => {
    //   // If user has an existing Review
    //   if (review.userId === this.auth.userProfile.sub) {
    //     this.userReview = review;
    //   }
    //   // Count total number of attendees
    //   // + additional guests
    //   if (review.attending) {
    //     guests++;
    //     if (review.guests) {
    //       guests += review.guests;
    //     }
    //   }
    //   return review;
    // });
    // this.reviews = reviewArr;
    // this.totalAttending = guests;
  }

  ngOnDestroy() {
    this.reviewsSub.unsubscribe();
  }
}
