import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-create-song",
  templateUrl: "./create-song.component.html",
  styleUrls: ["./create-song.component.scss"]
})
export class CreateSongComponent implements OnInit {
  pageTitle = "Create Song";
  showAllReviews = true;
  showReviewsText = "Add Review";

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  //Toggle review form
  toggleShowReviews() {
    this.showAllReviews = !this.showAllReviews;
    this.showReviewsText = this.showAllReviews ? "Hide Review" : "Add Review";
  }
}
