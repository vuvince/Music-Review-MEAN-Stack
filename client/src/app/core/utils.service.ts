// src/app/core/utils.service.ts

//SOURCE: https://auth0.com/blog/real-world-angular-series-part-3/
// [WILL NEED TO CHANGE]

import { Injectable } from "@angular/core";
import { DatePipe } from "@angular/common";

@Injectable()
export class UtilsService {
  constructor(private datePipe: DatePipe) {}

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

  //CHANGE
  // accepts start and end dates, then uses the date pipe to transform the dates into user-friendly strings. If the start and end dates are the same, only one date is returned. If they're different, the dates are returned as a range
  songDates(start, end): string {
    // Display single-day songs as "Jan 7, 2018"
    // Display multi-day songs as "Aug 12, 2017 - Aug 13, 2017"
    const startDate = this.datePipe.transform(start, "mediumDate");
    const endDate = this.datePipe.transform(end, "mediumDate");

    if (startDate === endDate) {
      return startDate;
    } else {
      return `${startDate} - ${endDate}`;
    }
  }

  tabIs(currentTab: string, tab: string): boolean {
    // Check if current tab is tab name
    return currentTab === tab;
  }

  //CHANGE
  songDatesTimes(start, end): string {
    // Display single-day songs as "1/7/2018, 5:30 PM - 7:30 PM"
    // Display multi-day songs as "8/12/2017, 8:00 PM - 8/13/2017, 10:00 AM"
    const _shortDate = "M/d/yyyy";
    const startDate = this.datePipe.transform(start, _shortDate);
    const startTime = this.datePipe.transform(start, "shortTime");
    const endDate = this.datePipe.transform(end, _shortDate);
    const endTime = this.datePipe.transform(end, "shortTime");

    if (startDate === endDate) {
      return `${startDate}, ${startTime} - ${endTime}`;
    } else {
      return `${startDate}, ${startTime} - ${endDate}, ${endTime}`;
    }
  }

  //CHANGE
  //Outputting a boolean that informs us if the song has already ended.
  songPast(songEnd): boolean {
    // Check if song has already ended
    const now = new Date();
    const then = new Date(songEnd.toString());
    return now >= then;
  }
}
