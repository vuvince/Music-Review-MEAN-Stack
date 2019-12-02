// src/app/core/utils.service.ts

//SOURCE: https://auth0.com/blog/real-world-angular-series-part-3/
// [WILL NEED TO CHANGE]

import { Injectable } from "@angular/core";
import { DatePipe } from "@angular/common";
import { AuthService } from "../auth/auth.service";
import { ApiService } from "./api.service";
import { ReviewModel } from "./models/review.model";
import { Subscription } from "rxjs";

@Injectable()
export class UtilsService {
  reviewsSub: Subscription;
  reviews: ReviewModel[]; //Array of all reviews for this specific song
  totalReview: number;
  totalRating: number;
  avgRating: number;

  constructor(
    public auth: AuthService,
    private api: ApiService,
    private datePipe: DatePipe
  ) {}

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

  //RETURNS THE SONG ARTIST
  songArtist(artist): string {
    const sArtist = artist.toString();
    return sArtist;
  }

  //Get reviews for songs
  getReviews(songId: string) {
    // this.loading = true;
    // Get Reviews by song Id
    console.log(songId);
    this.reviewsSub = this.api.getReviewsBySongId$(songId).subscribe(
      res => {
        this.reviews = res;
        // this.loading = false;
      },
      err => {
        console.error(err);
        // this.loading = false;
      }
    );
    return 0;
  }

  //Number of Reviews
  displayCount(reviews: number): string {
    // Example usage:
    const count = reviews === 1 ? " review" : " reviews";
    return reviews + count;
  }

  //Checks which tab it is
  tabIs(currentTab: string, tab: string): boolean {
    // Check if current tab is tab name
    return currentTab === tab;
  }

  //CAN CHANGE TO SHOW RATING
  showRating(ratings: number): string {
    // If bringing additional guest(s), show as "+n"
    if (ratings) {
      return `Rating: ${ratings}`;
    }
  }

  booleanToText(bool: boolean): string {
    // Change a boolean to 'Yes' or 'No' string
    return bool ? "Yes" : "No";
  }
}
