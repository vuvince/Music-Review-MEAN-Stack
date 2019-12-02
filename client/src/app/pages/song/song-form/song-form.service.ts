// src/app/pages/admin/song-form/song-form.service.ts
//SOURCE https://auth0.com/blog/real-world-angular-series-part-6/
import { Injectable } from "@angular/core";

@Injectable()
export class SongFormService {
  validationMessages: any;
  // Set up errors object
  formErrors = {
    title: "",
    artist: "",
    album: "",
    genre: "",
    cViolation: ""
  };
  // Min/maxlength validation
  textMin = 2;
  titleMax = 36;
  genreMax = 10;
  yearMax = 4;
  locMax = 200;
  dateMax = 10;
  timeMax = 8;
  descMax = 2000;
  ratingMax = 5;
  ratingMin = 1;
  // Formats
  dateFormat = "m/d/yyyy";
  timeFormat = "h:mm AM/PM";

  constructor() {
    this.validationMessages = {
      title: {
        required: `Title is <strong>required</strong>.`,
        minlength: `Title must be ${this.textMin} characters or more.`,
        maxlength: `Title must be ${this.titleMax} characters or less.`
      },
      album: {
        minlength: `Album must be ${this.textMin} characters or more.`,
        maxlength: `Album must be ${this.locMax} characters or less.`
      },
      artist: {
        required: `Artist is <strong>required</strong>.`,
        minlength: `Artist must be ${this.textMin} characters or more.`,
        maxlength: `Artist must be ${this.locMax} characters or less.`
      },
      genre: {
        minlength: `Genre must be ${this.textMin} characters or more.`,
        maxlength: `Genre must be ${this.locMax} characters or less.`
      },
      year: {
        minlength: `Year must be ${this.textMin} characters or more.`,
        maxlength: `Year must be ${this.yearMax} characters or less.`
      },
      description: {
        maxlength: `Description must be ${this.descMax} characters or less.`
      },
      rating: {
        maxlength: `Rating must be between 1-5.`
      },
      reviewComments: {
        maxlength: `Rating must be between 1-5.`
      }
    };
  }
}
