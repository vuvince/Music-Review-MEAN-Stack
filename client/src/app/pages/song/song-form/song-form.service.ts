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
  locMax = 200;
  dateMax = 10;
  timeMax = 8;
  descMax = 2000;
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
      Artist: {
        required: `Artist is <strong>required</strong>.`,
        minlength: `Artist must be ${this.textMin} characters or more.`,
        maxlength: `Artist must be ${this.locMax} characters or less.`
      },
      Genre: {
        required: `Genre is <strong>required</strong>.`,
        minlength: `Genre must be ${this.textMin} characters or more.`,
        maxlength: `Genre must be ${this.locMax} characters or less.`
      },
      startTime: {
        required: `Start time is <strong>required</strong>.`,
        pattern: `Start time must be a <strong>valid time</strong> in the format <strong>${this.timeFormat}</strong>.`,
        maxlength: `Start time must be ${this.timeMax} characters or less.`
      },
      endDate: {
        required: `End date is <strong>required</strong>.`,
        maxlength: `End date cannot be longer than ${this.dateMax} characters.`,
        pattern: `End date must be in the format <strong>${this.dateFormat}</strong>.`,
        date: `End date must be a <strong>valid date</strong> at least one day <strong>in the future</strong>.`
      },
      endTime: {
        required: `End time is <strong>required</strong>.`,
        pattern: `End time must be a <strong>valid time</strong> in the format <strong>${this.timeFormat}</strong>.`,
        maxlength: `End time must be ${this.timeMax} characters or less.`
      },
      viewPublic: {
        required: `You must specify whether this song should be publicly listed.`
      },
      description: {
        maxlength: `Description must be ${this.descMax} characters or less.`
      }
    };
  }
}
